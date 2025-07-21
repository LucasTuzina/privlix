import type { IMediaQueries } from '../queries/MediaQueries'
import type {
  IScanMediaFolderCommand,
  IUpdateWatchProgressCommand,
} from '../commands/MediaCommands'
import type { MediaLibrary, MediaStats, SearchResult, MediaFile } from '@domain/entities/MediaTypes'

/**
 * Application Service following DDD patterns
 * Orchestrates business use cases and coordinates between domain and infrastructure
 */
/* eslint-disable no-unused-vars */
export interface IMediaApplicationService {
  // Queries
  getMediaLibrary(): Promise<MediaLibrary>
  getMediaStats(): Promise<MediaStats>
  searchMedia(_query: string): Promise<SearchResult<MediaFile>[]>
  getRecentlyWatched(_limit?: number): Promise<MediaFile[]>
  getMediaById(_id: string): Promise<MediaFile | null>

  // Commands
  scanMediaFolder(_folderPath: string): Promise<void>
  updateWatchProgress(_mediaId: string, _progress: number, _timestamp?: Date): Promise<void>
}
/* eslint-enable no-unused-vars */

export class MediaApplicationService implements IMediaApplicationService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly _mediaQueries: IMediaQueries,
    // eslint-disable-next-line no-unused-vars
    private readonly _scanMediaFolderCommand: IScanMediaFolderCommand,
    // eslint-disable-next-line no-unused-vars
    private readonly _updateWatchProgressCommand: IUpdateWatchProgressCommand
  ) {}

  // Query handlers
  async getMediaLibrary(): Promise<MediaLibrary> {
    return await this._mediaQueries.getMediaLibrary()
  }

  async getMediaStats(): Promise<MediaStats> {
    return await this._mediaQueries.getMediaStats()
  }

  async searchMedia(query: string): Promise<SearchResult<MediaFile>[]> {
    return await this._mediaQueries.searchMedia(query)
  }

  async getRecentlyWatched(limit?: number): Promise<MediaFile[]> {
    return await this._mediaQueries.getRecentlyWatched(limit)
  }

  async getMediaById(id: string): Promise<MediaFile | null> {
    return await this._mediaQueries.getMediaById(id)
  }

  // Command handlers
  async scanMediaFolder(folderPath: string): Promise<void> {
    await this._scanMediaFolderCommand.execute(folderPath)
  }

  async updateWatchProgress(mediaId: string, progress: number, timestamp?: Date): Promise<void> {
    await this._updateWatchProgressCommand.execute(mediaId, progress, timestamp)
  }
}
