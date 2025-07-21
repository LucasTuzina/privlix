import type { WatchProgress } from '@domain/entities/MediaTypes'
import type { IMediaRepository } from '@domain/repositories/IMediaRepository'

/* eslint-disable no-unused-vars */
export interface IScanMediaFolderCommand {
  execute(_folderPath: string): Promise<void>
}

export interface IUpdateWatchProgressCommand {
  execute(_mediaId: string, _progress: number, _timestamp?: Date): Promise<void>
}
/* eslint-enable no-unused-vars */

export class ScanMediaFolderCommand implements IScanMediaFolderCommand {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly _mediaRepository: IMediaRepository) {}

  async execute(folderPath: string): Promise<void> {
    await this._mediaRepository.scanFolder(folderPath)
  }
}

export class UpdateWatchProgressCommand implements IUpdateWatchProgressCommand {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly _mediaRepository: IMediaRepository) {}

  async execute(mediaId: string, progress: number, timestamp: Date = new Date()): Promise<void> {
    const watchProgress: WatchProgress = {
      mediaId,
      progress,
      timestamp,
    }

    await this._mediaRepository.addWatchProgress(watchProgress)
  }
}
