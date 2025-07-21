const { contextBridge, ipcRenderer } = require('electron')

// API für Renderer-Prozess bereitstellen
contextBridge.exposeInMainWorld('electronAPI', {
  // Medien-Verwaltung
  selectMediaFolder: () => ipcRenderer.invoke('select-media-folder'),
  getMediaLibrary: () => ipcRenderer.invoke('get-media-library'),
  searchMedia: (query) => ipcRenderer.invoke('search-media', query),
  getRecentlyWatched: () => ipcRenderer.invoke('get-recently-watched'),
  
  // Wiedergabe
  updateWatchProgress: (mediaId, progress, timestamp) => 
    ipcRenderer.invoke('update-watch-progress', mediaId, progress, timestamp),
  getVideoInfo: (filePath) => ipcRenderer.invoke('get-video-info', filePath),
  
  // Dateisystem
  getFilePath: (filePath) => `file://${filePath}`,
  getThumbnailPath: (thumbnailPath) => thumbnailPath ? `file://${thumbnailPath}` : null
})
