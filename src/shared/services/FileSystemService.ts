import fs from 'fs/promises'
import path from 'path'
import chokidar from 'chokidar'
import type { FileStats } from '../types/MediaTypes'

export class FileSystemService {
  private static readonly SUPPORTED_EXTENSIONS = [
    '.mp4',
    '.mkv',
    '.avi',
    '.mov',
    '.wmv',
    '.flv',
    '.webm',
    '.m4v',
  ]

  private watcher: chokidar.FSWatcher | null = null

  /**
   * Scan directory for media files recursively
   */
  async scanMediaFiles(directoryPath: string): Promise<string[]> {
    const mediaFiles: string[] = []

    try {
      const items = await fs.readdir(directoryPath, { withFileTypes: true })

      for (const item of items) {
        const fullPath = path.join(directoryPath, item.name)

        if (item.isDirectory()) {
          // Recursively scan subdirectories
          const subFiles = await this.scanMediaFiles(fullPath)
          mediaFiles.push(...subFiles)
        } else if (item.isFile()) {
          // Check if file has supported media extension
          if (this.isMediaFile(item.name)) {
            mediaFiles.push(fullPath)
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${directoryPath}:`, error)
    }

    return mediaFiles
  }

  /**
   * Watch multiple directories for changes
   */
  async watchDirectories(paths: string[], onChange: () => void): Promise<void> {
    if (this.watcher) {
      await this.watcher.close()
    }

    this.watcher = chokidar.watch(paths, {
      ignoreInitial: true,
      ignored: /(^|[/\\])\../, // ignore dotfiles
    })

    this.watcher
      .on('add', filePath => {
        if (this.isMediaFile(filePath)) {
          onChange()
        }
      })
      .on('unlink', filePath => {
        if (this.isMediaFile(filePath)) {
          onChange()
        }
      })
      .on('change', filePath => {
        if (this.isMediaFile(filePath)) {
          onChange()
        }
      })
  }

  /**
   * Check if a file is a supported media file
   */
  private isMediaFile(fileName: string): boolean {
    const ext = path.extname(fileName).toLowerCase()
    return FileSystemService.SUPPORTED_EXTENSIONS.includes(ext)
  }

  /**
   * Get all video files recursively from a directory
   */
  async getVideoFiles(dirPath: string): Promise<string[]> {
    const videoFiles: string[] = []

    try {
      await this.scanDirectory(dirPath, videoFiles)
      return videoFiles
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error)
      return []
    }
  }

  /**
   * Recursively scan directory for video files
   */
  private async scanDirectory(dirPath: string, videoFiles: string[]): Promise<void> {
    const items = await fs.readdir(dirPath, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name)

      if (item.isDirectory()) {
        await this.scanDirectory(fullPath, videoFiles)
      } else if (item.isFile() && this.isSupportedFormat(item.name)) {
        videoFiles.push(fullPath)
      }
    }
  }

  /**
   * Check if file format is supported
   */
  isSupportedFormat(fileName: string): boolean {
    const ext = path.extname(fileName).toLowerCase()
    return FileSystemService.SUPPORTED_EXTENSIONS.includes(ext)
  }

  /**
   * Get file stats
   */
  async getFileStats(filePath: string): Promise<FileStats> {
    const stats = await fs.stat(filePath)
    return {
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    }
  }

  /**
   * Validate video file exists and has content
   */
  async validateVideoFile(filePath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(filePath)
      return stats.isFile() && stats.size > 0
    } catch {
      return false
    }
  }

  /**
   * Watch folder for changes
   */
  watchFolder(folderPath: string, callback: () => void): void {
    if (this.watcher) {
      this.watcher.close()
    }

    this.watcher = chokidar.watch(folderPath, {
      ignored: /(^|[/\\])\../, // ignore hidden files
      persistent: true,
    })

    this.watcher
      .on('add', () => callback())
      .on('unlink', () => callback())
      .on('change', () => callback())
  }

  /**
   * Stop watching folder
   */
  stopWatching(): void {
    if (this.watcher) {
      this.watcher.close()
      this.watcher = null
    }
  }
}
