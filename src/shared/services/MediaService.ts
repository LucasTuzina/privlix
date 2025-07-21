import { FileSystemService } from './FileSystemService'
import { MediaParsingService } from './MediaParsingService'
import { WatchProgressService } from './WatchProgressService'
import type { MediaItem, MediaCollection, MediaType, MediaLibraryStats } from '../types/MediaTypes'

/**
 * Main Media Management Service
 * Combines all media-related functionality in a single service
 */
export class MediaService {
  private fileSystemService: FileSystemService
  private watchProgressService: WatchProgressService
  private mediaMap: Map<string, MediaItem> = new Map()
  private collections: Map<string, MediaCollection> = new Map()
  private watchCallback: (() => void) | null = null

  constructor() {
    this.fileSystemService = new FileSystemService()
    this.watchProgressService = new WatchProgressService()
  }

  /**
   * Initialize media service with library paths
   */
  async initialize(libraryPaths: string[]): Promise<void> {
    // Start watching library paths for changes
    await this.fileSystemService.watchDirectories(libraryPaths, filePath => {
      this.handleFileChange(filePath)
    })

    // Initial scan of all library paths
    await this.scanLibraries(libraryPaths)
  }

  /**
   * Scan media libraries for content
   */
  async scanLibraries(libraryPaths: string[]): Promise<void> {
    this.mediaMap.clear()
    this.collections.clear()

    for (const libraryPath of libraryPaths) {
      await this.scanLibrary(libraryPath)
    }

    this.buildCollections()
  }

  /**
   * Get all media items
   */
  getAllMedia(): MediaItem[] {
    return Array.from(this.mediaMap.values())
  }

  /**
   * Get media by type
   */
  getMediaByType(type: MediaType): MediaItem[] {
    return this.getAllMedia().filter(media => media.type === type)
  }

  /**
   * Get all collections (TV series)
   */
  getAllCollections(): MediaCollection[] {
    return Array.from(this.collections.values())
  }

  /**
   * Get recently added media
   */
  getRecentlyAdded(limit = 20): MediaItem[] {
    return this.getAllMedia()
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, limit)
  }

  /**
   * Get continue watching items
   */
  getContinueWatching(limit = 10): MediaItem[] {
    const continueItems = this.watchProgressService.getContinueWatching(limit)
    return continueItems
      .map(progress => this.mediaMap.get(progress.filePath))
      .filter((media): media is MediaItem => media !== undefined)
  }

  /**
   * Get library statistics
   */
  getLibraryStats(): MediaLibraryStats {
    const allMedia = this.getAllMedia()
    const watchProgress = this.watchProgressService.getAllProgress()

    return {
      totalMovies: allMedia.filter(m => m.type === 'movie').length,
      totalEpisodes: allMedia.filter(m => m.type === 'episode').length,
      totalSeries: this.collections.size,
      watchedItems: watchProgress.filter(p => p.isCompleted).length,
      totalWatchTime: watchProgress.reduce((total, p) => total + p.currentTime, 0),
    }
  }

  /**
   * Search media by title
   */
  searchMedia(query: string): MediaItem[] {
    const searchTerm = query.toLowerCase()
    return this.getAllMedia().filter(
      media =>
        media.title.toLowerCase().includes(searchTerm) ||
        (media.seriesName && media.seriesName.toLowerCase().includes(searchTerm))
    )
  }

  /**
   * Update watch progress for a media item
   */
  updateWatchProgress(filePath: string, currentTime: number, duration: number): void {
    this.watchProgressService.updateProgress(filePath, { currentTime, duration })

    // Trigger callback if registered
    if (this.watchCallback) {
      this.watchCallback()
    }
  }

  /**
   * Mark media as completed
   */
  markAsCompleted(filePath: string): void {
    const media = this.mediaMap.get(filePath)
    if (media) {
      this.watchProgressService.markCompleted(filePath, media.duration || 0)
    }
  }

  /**
   * Get watch progress for media item
   */
  getWatchProgress(filePath: string) {
    return this.watchProgressService.getProgress(filePath)
  }

  /**
   * Register callback for watch progress changes
   */
  onWatchProgressChange(callback: () => void): void {
    this.watchCallback = callback
  }

  /**
   * Stop watching directories and cleanup
   */
  destroy(): void {
    this.fileSystemService.stopWatching()
    this.mediaMap.clear()
    this.collections.clear()
  }

  private async scanLibrary(libraryPath: string): Promise<void> {
    const mediaFiles = await this.fileSystemService.scanMediaFiles(libraryPath)

    for (const filePath of mediaFiles) {
      const fileName = filePath.split('/').pop() || ''
      const parseResult = MediaParsingService.parseMediaInfo(fileName)
      const stats = await this.fileSystemService.getFileStats(filePath)

      const mediaItem: MediaItem = {
        id: filePath, // Use file path as ID for simplicity
        title: parseResult.title,
        type: parseResult.type,
        filePath,
        fileName,
        fileSize: stats?.size || 0,
        duration: null, // Will be populated when played
        dateAdded: stats?.birthtime?.toISOString() || new Date().toISOString(),
        ...(parseResult.type === 'episode' && {
          seriesName: parseResult.seriesName,
          seasonNumber: parseResult.seasonNumber,
          episodeNumber: parseResult.episodeNumber,
        }),
      }

      this.mediaMap.set(filePath, mediaItem)
    }
  }

  private buildCollections(): void {
    const episodeItems = this.getAllMedia().filter(item => item.type === 'episode')

    // Group episodes by series name
    const seriesGroups = new Map<string, MediaItem[]>()
    for (const episode of episodeItems) {
      if (episode.seriesName) {
        if (!seriesGroups.has(episode.seriesName)) {
          seriesGroups.set(episode.seriesName, [])
        }
        seriesGroups.get(episode.seriesName)!.push(episode)
      }
    }

    // Create collections
    for (const [seriesName, episodes] of seriesGroups) {
      const collection: MediaCollection = {
        id: `series-${seriesName.toLowerCase().replace(/\s+/g, '-')}`,
        title: seriesName,
        type: 'series',
        episodes: episodes.sort((a, b) => {
          const seasonDiff = (a.seasonNumber || 0) - (b.seasonNumber || 0)
          if (seasonDiff !== 0) return seasonDiff
          return (a.episodeNumber || 0) - (b.episodeNumber || 0)
        }),
        episodeCount: episodes.length,
        seasons: [...new Set(episodes.map(e => e.seasonNumber).filter(Boolean))] as number[],
      }

      this.collections.set(collection.id, collection)
    }
  }

  private handleFileChange(filePath: string): void {
    // File system change detected - could trigger re-scan
    console.log(`File changed: ${filePath}`)
    // For now, just log. Could implement incremental updates here
  }
}
