import { promises as fs } from 'fs'
import chokidar, { FSWatcher } from 'chokidar'
import type {
  IFileSystemRepository,
  FileStats,
  FileWatchEvent,
} from '@domain/repositories/IMediaRepository'

/**
 * File System Repository Implementation using chokidar for file watching
 */
export class ChokidarFileSystemRepository implements IFileSystemRepository {
  private watcher?: FSWatcher

  watchFolder(
    folderPath: string,
    // eslint-disable-next-line no-unused-vars
    callback: (filePath: string, event: FileWatchEvent) => void
  ): void {
    if (this.watcher) {
      this.watcher.close()
    }

    this.watcher = chokidar.watch(folderPath, {
      ignored: /(^|[/\\])\../, // ignore hidden files
      persistent: true,
    })

    this.watcher
      .on('add', filePath => callback(filePath, 'added'))
      .on('unlink', filePath => callback(filePath, 'removed'))
      .on('change', filePath => callback(filePath, 'changed'))
  }

  stopWatching(): void {
    if (this.watcher) {
      this.watcher.close()
      this.watcher = undefined
    }
  }

  async validateVideoFile(filePath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(filePath)
      return stats.isFile() && stats.size > 0
    } catch {
      return false
    }
  }

  async getFileStats(filePath: string): Promise<FileStats> {
    const stats = await fs.stat(filePath)
    return {
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    }
  }
}
