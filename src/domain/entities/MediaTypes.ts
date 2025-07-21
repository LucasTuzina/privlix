// Core domain types for the media library

export interface MediaFile {
  readonly id: string
  readonly title: string
  readonly filePath: string
  readonly fileName: string
  readonly fileSize: number
  readonly thumbnailPath?: string
  readonly type: MediaType
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface Movie extends MediaFile {
  readonly type: 'movie'
  readonly genre?: string[]
  readonly year?: number
  readonly duration?: number
}

export interface Episode extends MediaFile {
  readonly type: 'episode'
  readonly seriesName: string
  readonly seasonNumber: number
  readonly episodeNumber: number
  readonly duration?: number
}

export interface Series {
  readonly name: string
  readonly episodes: Episode[]
  readonly thumbnailPath?: string
  readonly totalEpisodes: number
  readonly lastWatched?: Date
  readonly genre?: string[]
}

export type MediaType = 'movie' | 'episode'

export interface WatchProgress {
  readonly mediaId: string
  readonly progress: number // 0-1 (0% to 100%)
  readonly timestamp: Date
  readonly duration?: number
}

export interface MediaLibrary {
  readonly movies: Movie[]
  readonly series: Series[]
}

export interface MediaStats {
  readonly totalMovies: number
  readonly totalSeries: number
  readonly totalEpisodes: number
  readonly totalFiles: number
  readonly totalSize: number
}

export interface SearchResult<T = MediaFile> {
  readonly item: T
  readonly score: number
}
