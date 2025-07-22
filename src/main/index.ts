import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron'
import path from 'path'
import { MediaService } from '../shared/services/MediaService'
import { SettingsService } from '../shared/services/SettingsService'

/**
 * Main Electron Process
 * Handles window management and IPC communication
 */
class MainProcess {
  private mainWindow: BrowserWindow | null = null
  private mediaService: MediaService
  private settingsService: SettingsService
  private readonly isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production'
    this.mediaService = new MediaService()
    this.settingsService = new SettingsService()
  }

  private createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1200,
      minHeight: 700,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        allowRunningInsecureContent: false,
        experimentalFeatures: false,
        webSecurity: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      show: false,
    })

    const startUrl = this.isDevelopment
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../renderer/index.html')}`

    this.mainWindow.loadURL(startUrl)

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show()
      if (this.isDevelopment) {
        this.mainWindow?.webContents.openDevTools()
      }
    })

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  private setupFileProtocol(): void {
    protocol.registerFileProtocol('privlix-file', (request, callback) => {
      const url = request.url.replace('privlix-file://', '')
      const decodedUrl = decodeURIComponent(url)
      callback({ path: decodedUrl })
    })
  }

  private setupIPC(): void {
    // Select media folder
    ipcMain.handle('select-media-folder', async (): Promise<string | null> => {
      if (!this.mainWindow) return null

      const result = await dialog.showOpenDialog(this.mainWindow, {
        properties: ['openDirectory'],
      })

      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0]
        await this.mediaService.scanLibraries([folderPath])
        // Speichere den ausgewählten Ordner in den Settings
        this.settingsService.setSelectedMediaFolder(folderPath)
        return folderPath
      }
      return null
    })

    // Settings Management
    ipcMain.handle('get-settings', async () => {
      return this.settingsService.getSettings()
    })

    ipcMain.handle('update-settings', async (_, newSettings) => {
      this.settingsService.updateSettings(newSettings)
      return this.settingsService.getSettings()
    })

    ipcMain.handle('get-selected-media-folder', async () => {
      return this.settingsService.getSelectedMediaFolder()
    })

    ipcMain.handle('unlink-media-folder', async () => {
      this.settingsService.unlinkMediaFolder()
      return null
    })

    // Get all media
    ipcMain.handle('get-media-library', async () => {
      return {
        movies: this.mediaService.getMediaByType('movie'),
        series: this.mediaService.getAllCollections(),
      }
    })

    // Get media stats
    ipcMain.handle('get-media-stats', async () => {
      return this.mediaService.getLibraryStats()
    })

    // Search media
    ipcMain.handle('search-media', async (_, query: string) => {
      return this.mediaService.searchMedia(query)
    })

    // Update watch progress
    ipcMain.handle(
      'update-watch-progress',
      async (_, filePath: string, currentTime: number, duration: number) => {
        this.mediaService.updateWatchProgress(filePath, currentTime, duration)
        return { success: true }
      }
    )

    // Get recently watched / continue watching
    ipcMain.handle('get-recently-watched', async () => {
      return this.mediaService.getContinueWatching()
    })

    // Get media by ID (file path)
    ipcMain.handle('get-media-by-id', async (_, id: string) => {
      const allMedia = this.mediaService.getAllMedia()
      return allMedia.find(media => media.id === id) || null
    })
  }

  public init(): void {
    // Registriere custom protocol für lokale Dateien vor app.whenReady()
    protocol.registerSchemesAsPrivileged([
      {
        scheme: 'privlix-file',
        privileges: {
          secure: true,
          supportFetchAPI: true,
          corsEnabled: false,
          stream: true,
        },
      },
    ])

    app.whenReady().then(async () => {
      this.setupFileProtocol()
      this.createWindow()
      this.setupIPC()

      // Lade gespeicherten Media-Ordner beim App-Start
      const savedMediaFolder = this.settingsService.getSelectedMediaFolder()
      if (savedMediaFolder) {
        try {
          await this.mediaService.scanLibraries([savedMediaFolder])
          console.log('Loaded saved media folder:', savedMediaFolder)
        } catch (error) {
          console.error('Error loading saved media folder:', error)
          // Entferne ungültigen Ordner aus Settings
          this.settingsService.unlinkMediaFolder()
        }
      }

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow()
        }
      })
    })

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('before-quit', async () => {
      // Cleanup resources
      console.log('Application shutting down...')
    })
  }
}

// Initialize the main process
const mainProcess = new MainProcess()
mainProcess.init()
