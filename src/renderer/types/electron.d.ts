import type { MediaLibrary, MediaStats, MediaFile, SearchResult } from '@domain/entities/MediaTypes'

export interface ElectronAPI {
  // Media folder management
  selectMediaFolder(): Promise<string | null>
  
  // Media library queries
  getMediaLibrary(): Promise<MediaLibrary>
  getMediaStats(): Promise<MediaStats>
  getRecentlyWatched(): Promise<MediaFile[]>
  getMediaById(id: string): Promise<MediaFile | null>
  
  // Search
  searchMedia(query: string): Promise<SearchResult<MediaFile>[]>
  
  // Watch progress
  updateWatchProgress(mediaId: string, progress: number, timestamp: number): Promise<void>
  
  // File system utilities
  getFilePath(filePath: string): string
  getThumbnailPath(thumbnailPath: string): string | null
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
