import { contextBridge, ipcRenderer } from 'electron'

// API for renderer process - matches the existing ElectronAPI interface
const electronAPI = {
  // Media management
  selectMediaFolder: () => ipcRenderer.invoke('select-media-folder'),
  getMediaLibrary: () => ipcRenderer.invoke('get-media-library'),
  getMediaStats: () => ipcRenderer.invoke('get-media-stats'),
  searchMedia: (query: string) => ipcRenderer.invoke('search-media', query),
  getRecentlyWatched: () => ipcRenderer.invoke('get-recently-watched'),
  
  // Playback
  updateWatchProgress: (mediaId: string, progress: number, timestamp: number) => 
    ipcRenderer.invoke('update-watch-progress', mediaId, progress, timestamp),
  getVideoInfo: (filePath: string) => ipcRenderer.invoke('get-video-info', filePath),
  
  // File system
  getFilePath: (filePath: string) => `file://${filePath}`,
  getThumbnailPath: (thumbnailPath: string | null) => 
    thumbnailPath ? `file://${thumbnailPath}` : null
}

// Expose API to main world
contextBridge.exposeInMainWorld('electronAPI', electronAPI)
