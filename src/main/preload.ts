import { contextBridge, ipcRenderer } from 'electron'

// Settings interface for type safety
interface AppSettings {
  selectedMediaFolder?: string
  language?: 'en' | 'de'
  theme?: 'dark' | 'light'
  autoplay?: boolean
  volume?: number
}

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

  // Settings management
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateSettings: (newSettings: Partial<AppSettings>) =>
    ipcRenderer.invoke('update-settings', newSettings),
  getSelectedMediaFolder: () => ipcRenderer.invoke('get-selected-media-folder'),
  unlinkMediaFolder: () => ipcRenderer.invoke('unlink-media-folder'),

  // File system
  getFilePath: (filePath: string) => `privlix-file://${encodeURIComponent(filePath)}`,
  getThumbnailPath: (thumbnailPath: string | null) =>
    thumbnailPath ? `privlix-file://${encodeURIComponent(thumbnailPath)}` : null,
}

// Expose API to main world
contextBridge.exposeInMainWorld('electronAPI', electronAPI)
