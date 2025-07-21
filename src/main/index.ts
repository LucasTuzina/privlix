import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { MediaApplicationService } from '../application/services/MediaApplicationService';
import { MediaQueries } from '../application/queries/MediaQueries';
import { ScanMediaFolderCommand, UpdateWatchProgressCommand } from '../application/commands/MediaCommands';
import { InMemoryMediaRepository } from '../infrastructure/repositories/InMemoryMediaRepository';
import { ChokidarFileSystemRepository } from '../infrastructure/repositories/ChokidarFileSystemRepository';

/**
 * Main Electron Process
 * Handles window management and IPC communication
 */
class MainProcess {
  private mainWindow: BrowserWindow | null = null;
  private mediaService: MediaApplicationService;
  private readonly isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Setup dependency injection
    const fileSystemRepo = new ChokidarFileSystemRepository();
    const mediaRepo = new InMemoryMediaRepository(fileSystemRepo);
    const mediaQueries = new MediaQueries(mediaRepo);
    const scanCommand = new ScanMediaFolderCommand(mediaRepo);
    const watchProgressCommand = new UpdateWatchProgressCommand(mediaRepo);
    
    this.mediaService = new MediaApplicationService(
      mediaQueries,
      scanCommand,
      watchProgressCommand
    );
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
        preload: path.join(__dirname, 'preload.js')
      },
      show: false
    });

    const startUrl = this.isDevelopment 
      ? 'http://localhost:3001'
      : `file://${path.join(__dirname, '../renderer/index.html')}`;

    this.mainWindow.loadURL(startUrl);

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
      if (this.isDevelopment) {
        this.mainWindow?.webContents.openDevTools();
      }
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private setupIPC(): void {
    // Select media folder
    ipcMain.handle('select-media-folder', async (): Promise<string | null> => {
      if (!this.mainWindow) return null;
      
      const result = await dialog.showOpenDialog(this.mainWindow, {
        properties: ['openDirectory']
      });
      
      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        await this.mediaService.scanMediaFolder(folderPath);
        return folderPath;
      }
      return null;
    });

    // Get media library
    ipcMain.handle('get-media-library', async () => {
      return await this.mediaService.getMediaLibrary();
    });

    // Get media stats
    ipcMain.handle('get-media-stats', async () => {
      return await this.mediaService.getMediaStats();
    });

    // Search media
    ipcMain.handle('search-media', async (_, query: string) => {
      return await this.mediaService.searchMedia(query);
    });

    // Update watch progress
    ipcMain.handle('update-watch-progress', async (_, mediaId: string, progress: number, timestamp?: number) => {
      const date = timestamp ? new Date(timestamp) : new Date();
      return await this.mediaService.updateWatchProgress(mediaId, progress, date);
    });

    // Get recently watched
    ipcMain.handle('get-recently-watched', async () => {
      return await this.mediaService.getRecentlyWatched();
    });

    // Get media by ID
    ipcMain.handle('get-media-by-id', async (_, id: string) => {
      return await this.mediaService.getMediaById(id);
    });
  }

  public init(): void {
    app.whenReady().then(() => {
      this.createWindow();
      this.setupIPC();

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      });
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('before-quit', async () => {
      // Cleanup resources
      console.log('Application shutting down...');
    });
  }
}

// Initialize the main process
const mainProcess = new MainProcess();
mainProcess.init();
