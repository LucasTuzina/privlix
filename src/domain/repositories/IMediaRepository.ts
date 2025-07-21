import type { MediaLibrary, MediaFile, WatchProgress, SearchResult } from '../entities/MediaTypes';

// Repository interfaces following DDD patterns

export interface IMediaRepository {
  scanFolder(folderPath: string): Promise<void>;
  getLibrary(): Promise<MediaLibrary>;
  findById(id: string): Promise<MediaFile | null>;
  search(query: string): Promise<SearchResult<MediaFile>[]>;
  addWatchProgress(progress: WatchProgress): Promise<void>;
  getWatchProgress(mediaId: string): Promise<WatchProgress | null>;
  getRecentlyWatched(limit?: number): Promise<MediaFile[]>;
}

export interface IFileSystemRepository {
  watchFolder(folderPath: string, callback: (filePath: string, event: FileWatchEvent) => void): void;
  stopWatching(): void;
  validateVideoFile(filePath: string): Promise<boolean>;
  getFileStats(filePath: string): Promise<FileStats>;
}

export interface FileStats {
  size: number;
  createdAt: Date;
  modifiedAt: Date;
}

export type FileWatchEvent = 'added' | 'removed' | 'changed';
