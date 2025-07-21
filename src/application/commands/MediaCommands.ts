import type { WatchProgress } from '@domain/entities/MediaTypes';
import type { IMediaRepository } from '@domain/repositories/IMediaRepository';

export interface IScanMediaFolderCommand {
  execute(folderPath: string): Promise<void>;
}

export interface IUpdateWatchProgressCommand {
  execute(mediaId: string, progress: number, timestamp?: Date): Promise<void>;
}

export class ScanMediaFolderCommand implements IScanMediaFolderCommand {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(folderPath: string): Promise<void> {
    await this.mediaRepository.scanFolder(folderPath);
  }
}

export class UpdateWatchProgressCommand implements IUpdateWatchProgressCommand {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async execute(mediaId: string, progress: number, timestamp: Date = new Date()): Promise<void> {
    const watchProgress: WatchProgress = {
      mediaId,
      progress,
      timestamp
    };

    await this.mediaRepository.addWatchProgress(watchProgress);
  }
}
