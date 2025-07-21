export interface MediaFile {
  id: string
  path: string
  name: string
  type: 'movie' | 'episode'
  title: string
  size: number
  createdAt: Date
  modifiedAt: Date
  thumbnailPath?: string
  watchProgress?: WatchProgress
}

export interface Movie extends MediaFile {
  type: 'movie'
  year?: number
  genre?: string[]
  duration?: number
  poster?: string
  backdrop?: string
  rating?: number
  description?: string
}

export interface Episode extends MediaFile {
  type: 'episode'
  seriesName: string
  seasonNumber: number
  episodeNumber: number
  duration?: number
  poster?: string
  description?: string
}

export interface Series {
  name: string
  episodes: Episode[]
  totalEpisodes: number
  lastWatched?: Date
}

/**
 * Media watch progress tracking
 */
export interface WatchProgress {
  filePath: string
  currentTime: number
  duration: number
  isCompleted: boolean
  firstWatchedAt: string
  updatedAt: string
}

/**
 * Update structure for watch progress
 */
export interface MediaProgressUpdate {
  currentTime: number
  duration: number
}

export interface MediaLibrary {
  movies: MediaItem[]
  series: MediaCollection[]
}

export interface MediaStats {
  totalMovies: number
  totalSeries: number
  totalEpisodes: number
  totalFiles: number
  totalSize: number
}

export interface SearchResult<T> {
  item: T
  score: number
}

export interface FileStats {
  size: number
  createdAt: Date
  modifiedAt: Date
  birthtime?: Date
}

/**
 * Main media item interface
 */
export interface MediaItem {
  id: string
  title: string
  type: MediaType
  filePath: string
  fileName: string
  fileSize: number
  duration: number | null
  dateAdded: string
  // Episode-specific fields
  seriesName?: string
  seasonNumber?: number
  episodeNumber?: number
}

/**
 * Media collection (e.g., TV series)
 */
export interface MediaCollection {
  id: string
  title: string
  type: 'series'
  episodes: MediaItem[]
  episodeCount: number
  seasons: number[]
}

/**
 * Media library statistics
 */
export interface MediaLibraryStats {
  totalMovies: number
  totalEpisodes: number
  totalSeries: number
  watchedItems: number
  totalWatchTime: number
}

export type FileWatchEvent = 'added' | 'removed' | 'changed'

export type MediaType = 'movie' | 'episode'

export interface MediaParsingResult {
  title: string
  type: MediaType
  seriesName?: string
  seasonNumber?: number
  episodeNumber?: number
}
