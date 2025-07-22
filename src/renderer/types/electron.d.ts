import type {
  MediaItem,
  MediaCollection,
  MediaLibraryStats,
  MediaLibrary,
} from '../../shared/types/MediaTypes'
import type { AppSettings } from '../../shared/services/SettingsService'

export interface ElectronAPI {
  // Media folder management
  selectMediaFolder(): Promise<string | null>

  // Media library queries
  getMediaLibrary(): Promise<MediaLibrary>
  getMediaStats(): Promise<MediaLibraryStats>
  getRecentlyWatched(): Promise<MediaItem[]>
  getMediaById(id: string): Promise<MediaItem | null>

  // Search
  searchMedia(query: string): Promise<MediaItem[]>

  // Watch progress
  updateWatchProgress(
    filePath: string,
    currentTime: number,
    duration: number
  ): Promise<{ success: boolean }>

  // Settings management
  getSettings(): Promise<AppSettings>
  updateSettings(newSettings: Partial<AppSettings>): Promise<AppSettings>
  getSelectedMediaFolder(): Promise<string | undefined>
  unlinkMediaFolder(): Promise<null>

  // File system utilities
  getFilePath(filePath: string): string
  getThumbnailPath(thumbnailPath: string): string | null
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
