import type { WatchProgress, MediaProgressUpdate } from '../types/MediaTypes'
import fs from 'fs/promises'
import path from 'path'

/**
 * Simplified Watch Progress Management Service
 */
export class WatchProgressService {
  private static readonly STORAGE_FILE = 'privlix-watch-progress.json'
  private watchProgressMap: Map<string, WatchProgress> = new Map()
  private storageDir: string

  constructor(storageDir = './data') {
    this.storageDir = storageDir
    this.loadFromStorage()
  }

  /**
   * Get watch progress for specific media file
   */
  getProgress(filePath: string): WatchProgress | null {
    return this.watchProgressMap.get(filePath) || null
  }

  /**
   * Get all watch progress records
   */
  getAllProgress(): WatchProgress[] {
    return Array.from(this.watchProgressMap.values())
  }

  /**
   * Get recently watched items
   */
  getRecentlyWatched(limit = 10): WatchProgress[] {
    return Array.from(this.watchProgressMap.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit)
  }

  /**
   * Get continue watching items (incomplete progress)
   */
  getContinueWatching(limit = 10): WatchProgress[] {
    return Array.from(this.watchProgressMap.values())
      .filter(progress => progress.isCompleted === false)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit)
  }

  /**
   * Update watch progress for media
   */
  updateProgress(filePath: string, update: MediaProgressUpdate): void {
    const existingProgress = this.watchProgressMap.get(filePath)
    const now = new Date().toISOString()

    const watchProgress: WatchProgress = {
      filePath,
      duration: update.duration,
      currentTime: update.currentTime,
      isCompleted: update.currentTime >= update.duration * 0.9, // 90% is considered complete
      firstWatchedAt: existingProgress?.firstWatchedAt || now,
      updatedAt: now,
    }

    this.watchProgressMap.set(filePath, watchProgress)
    this.saveToStorage()
  }

  /**
   * Mark media as completed
   */
  markCompleted(filePath: string, duration: number): void {
    this.updateProgress(filePath, {
      currentTime: duration,
      duration,
    })
  }

  /**
   * Remove progress for specific media
   */
  removeProgress(filePath: string): void {
    this.watchProgressMap.delete(filePath)
    this.saveToStorage()
  }

  /**
   * Clear all watch progress
   */
  clearAllProgress(): void {
    this.watchProgressMap.clear()
    this.saveToStorage()
  }

  private loadFromStorage(): void {
    // In browser environment (renderer), use localStorage
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      try {
        const stored = globalThis.localStorage.getItem('privlix-watch-progress')
        if (stored) {
          const progressArray: WatchProgress[] = JSON.parse(stored)
          this.watchProgressMap = new Map(
            progressArray.map(progress => [progress.filePath, progress])
          )
        }
      } catch (_error) {
        console.error('Failed to load watch progress from localStorage:', _error)
        this.watchProgressMap = new Map()
      }
      return
    }

    // In Node.js environment (main process), use file system
    this.loadFromFileSystem()
  }

  private async loadFromFileSystem(): Promise<void> {
    try {
      const filePath = path.join(this.storageDir, WatchProgressService.STORAGE_FILE)
      const stored = await fs.readFile(filePath, 'utf8')
      const progressArray: WatchProgress[] = JSON.parse(stored)
      this.watchProgressMap = new Map(progressArray.map(progress => [progress.filePath, progress]))
    } catch {
      // File doesn't exist or other error - start with empty map
      this.watchProgressMap = new Map()
    }
  }

  private saveToStorage(): void {
    // In browser environment (renderer), use localStorage
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      try {
        const progressArray = Array.from(this.watchProgressMap.values())
        globalThis.localStorage.setItem('privlix-watch-progress', JSON.stringify(progressArray))
      } catch {
        console.error('Failed to save watch progress to localStorage')
      }
      return
    }

    // In Node.js environment (main process), use file system
    this.saveToFileSystem()
  }

  private async saveToFileSystem(): Promise<void> {
    try {
      // Ensure storage directory exists
      await fs.mkdir(this.storageDir, { recursive: true })

      const progressArray = Array.from(this.watchProgressMap.values())
      const filePath = path.join(this.storageDir, WatchProgressService.STORAGE_FILE)
      await fs.writeFile(filePath, JSON.stringify(progressArray, null, 2))
    } catch (error) {
      console.error('Failed to save watch progress to file system:', error)
    }
  }
}
