import type { IMediaQueries } from '../queries/MediaQueries';
import type { IScanMediaFolderCommand, IUpdateWatchProgressCommand } from '../commands/MediaCommands';
import type { MediaLibrary, MediaStats, SearchResult, MediaFile } from '@domain/entities/MediaTypes';

/**
 * Application Service following DDD patterns
 * Orchestrates business use cases and coordinates between domain and infrastructure
 */
export interface IMediaApplicationService {
  // Queries
  getMediaLibrary(): Promise<MediaLibrary>;
  getMediaStats(): Promise<MediaStats>;
  searchMedia(query: string): Promise<SearchResult<MediaFile>[]>;
  getRecentlyWatched(limit?: number): Promise<MediaFile[]>;
  getMediaById(id: string): Promise<MediaFile | null>;

  // Commands
  scanMediaFolder(folderPath: string): Promise<void>;
  updateWatchProgress(mediaId: string, progress: number, timestamp?: Date): Promise<void>;
}

export class MediaApplicationService implements IMediaApplicationService {
  constructor(
    private readonly mediaQueries: IMediaQueries,
    private readonly scanMediaFolderCommand: IScanMediaFolderCommand,
    private readonly updateWatchProgressCommand: IUpdateWatchProgressCommand
  ) {}

  // Query handlers
  async getMediaLibrary(): Promise<MediaLibrary> {
    return await this.mediaQueries.getMediaLibrary();
  }

  async getMediaStats(): Promise<MediaStats> {
    return await this.mediaQueries.getMediaStats();
  }

  async searchMedia(query: string): Promise<SearchResult<MediaFile>[]> {
    return await this.mediaQueries.searchMedia(query);
  }

  async getRecentlyWatched(limit?: number): Promise<MediaFile[]> {
    return await this.mediaQueries.getRecentlyWatched(limit);
  }

  async getMediaById(id: string): Promise<MediaFile | null> {
    return await this.mediaQueries.getMediaById(id);
  }

  // Command handlers
  async scanMediaFolder(folderPath: string): Promise<void> {
    await this.scanMediaFolderCommand.execute(folderPath);
  }

  async updateWatchProgress(mediaId: string, progress: number, timestamp?: Date): Promise<void> {
    await this.updateWatchProgressCommand.execute(mediaId, progress, timestamp);
  }
}
