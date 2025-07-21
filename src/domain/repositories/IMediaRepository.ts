import type { MediaLibrary, MediaFile, WatchProgress, SearchResult } from '../entities/MediaTypes'

// Repository interfaces following DDD patterns

/* eslint-disable no-unused-vars */
export interface IMediaRepository {
  scanFolder(_folderPath: string): Promise<void>
  getLibrary(): Promise<MediaLibrary>
  findById(_id: string): Promise<MediaFile | null>
  search(_query: string): Promise<SearchResult<MediaFile>[]>
  addWatchProgress(_progress: WatchProgress): Promise<void>
  getWatchProgress(_mediaId: string): Promise<WatchProgress | null>
  getRecentlyWatched(_limit?: number): Promise<MediaFile[]>
}

export interface IFileSystemRepository {
  watchFolder(
    _folderPath: string,
    _callback: (_filePath: string, _event: FileWatchEvent) => void
  ): void
  stopWatching(): void
  validateVideoFile(_filePath: string): Promise<boolean>
  getFileStats(_filePath: string): Promise<FileStats>
}
/* eslint-enable no-unused-vars */

export interface FileStats {
  size: number
  createdAt: Date
  modifiedAt: Date
}

export type FileWatchEvent = 'added' | 'removed' | 'changed'
