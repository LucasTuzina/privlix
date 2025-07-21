import { promises as fs } from 'fs'
import path from 'path'
import Fuse from 'fuse.js'
import type {
  IMediaRepository,
  IFileSystemRepository,
  FileWatchEvent,
} from '@domain/repositories/IMediaRepository'
import type {
  MediaLibrary,
  MediaFile,
  Movie,
  Episode,
  Series,
  WatchProgress,
  SearchResult,
} from '@domain/entities/MediaTypes'
import { MediaParsingService } from '@domain/services/MediaParsingService'

/**
 * In-Memory Media Repository Implementation
 * For production, this could be replaced with a database-backed implementation
 */
export class InMemoryMediaRepository implements IMediaRepository {
  private mediaFiles: MediaFile[] = []
  private watchProgressMap = new Map<string, WatchProgress>()
  private searchIndex?: Fuse<MediaFile>

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly _fileSystemRepo: IFileSystemRepository) {}

  async scanFolder(folderPath: string): Promise<void> {
    console.log(`Scanning media folder: ${folderPath}`)

    // Reset current library
    this.mediaFiles = []

    // Recursively scan directory
    await this.scanDirectory(folderPath)

    // Setup file watcher
    this._fileSystemRepo.watchFolder(folderPath, (filePath: string, event: FileWatchEvent) => {
      this.handleFileSystemEvent(filePath, event)
    })

    // Initialize search index
    this.initializeSearchIndex()

    console.log(`Scan completed. Found ${this.mediaFiles.length} media files.`)
  }

  async getLibrary(): Promise<MediaLibrary> {
    return this.organizeMediaLibrary()
  }

  async findById(id: string): Promise<MediaFile | null> {
    return this.mediaFiles.find(media => media.id === id) || null
  }

  async search(query: string): Promise<SearchResult<MediaFile>[]> {
    if (!this.searchIndex || !query.trim()) {
      return []
    }

    const results = this.searchIndex.search(query)
    return results.map(result => ({
      item: result.item,
      score: result.score || 0,
    }))
  }

  async addWatchProgress(progress: WatchProgress): Promise<void> {
    this.watchProgressMap.set(progress.mediaId, progress)
  }

  async getWatchProgress(mediaId: string): Promise<WatchProgress | null> {
    return this.watchProgressMap.get(mediaId) || null
  }

  async getRecentlyWatched(limit: number = 10): Promise<MediaFile[]> {
    const recentItems = Array.from(this.watchProgressMap.entries())
      .filter(([, data]) => data.progress > 0 && data.progress < 0.95)
      .sort((a, b) => b[1].timestamp.getTime() - a[1].timestamp.getTime())
      .slice(0, limit)
      .map(([id]) => this.mediaFiles.find(item => item.id === id))
      .filter((item): item is MediaFile => item !== undefined)

    return recentItems
  }

  private async scanDirectory(dirPath: string): Promise<void> {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true })

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name)

        if (item.isDirectory()) {
          await this.scanDirectory(fullPath)
        } else if (item.isFile() && MediaParsingService.isSupportedFormat(item.name)) {
          await this.processMediaFile(fullPath)
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error)
    }
  }

  private async processMediaFile(filePath: string): Promise<void> {
    const fileName = path.basename(filePath)
    const directoryName = path.basename(path.dirname(filePath))

    // Parse media information
    const parsingResult = MediaParsingService.parseMediaInfo(fileName, directoryName, filePath)

    // Get file stats
    const fileStats = await this._fileSystemRepo.getFileStats(filePath)

    // Create media entity
    const baseMedia = {
      id: this.generateId(filePath),
      title: parsingResult.title,
      filePath,
      fileName,
      fileSize: fileStats.size,
      type: parsingResult.type,
      createdAt: fileStats.createdAt,
      updatedAt: fileStats.modifiedAt,
    }

    let mediaFile: MediaFile

    if (parsingResult.type === 'episode' && parsingResult.seriesName) {
      mediaFile = {
        ...baseMedia,
        type: 'episode',
        seriesName: parsingResult.seriesName,
        seasonNumber: parsingResult.seasonNumber!,
        episodeNumber: parsingResult.episodeNumber!,
      } as Episode
    } else {
      mediaFile = {
        ...baseMedia,
        type: 'movie',
      } as Movie
    }

    this.mediaFiles.push(mediaFile)
  }

  private organizeMediaLibrary(): MediaLibrary {
    const movies: Movie[] = []
    const seriesMap = new Map<string, Series>()

    this.mediaFiles.forEach(media => {
      if (media.type === 'movie') {
        movies.push(media as Movie)
      } else if (media.type === 'episode') {
        const episode = media as Episode
        const seriesName = episode.seriesName

        if (!seriesMap.has(seriesName)) {
          seriesMap.set(seriesName, {
            name: seriesName,
            episodes: [],
            totalEpisodes: 0,
            lastWatched: this.watchProgressMap.get(episode.id)?.timestamp,
          })
        }

        const series = seriesMap.get(seriesName)!
        series.episodes.push(episode)
        // Update totalEpisodes by creating new object
        seriesMap.set(seriesName, {
          ...series,
          totalEpisodes: series.episodes.length,
        })
      }
    })

    // Sort episodes within series
    seriesMap.forEach(series => {
      series.episodes.sort((a, b) => {
        if (a.seasonNumber !== b.seasonNumber) {
          return a.seasonNumber - b.seasonNumber
        }
        return a.episodeNumber - b.episodeNumber
      })
    })

    return {
      movies: movies.sort((a, b) => a.title.localeCompare(b.title)),
      series: Array.from(seriesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    }
  }

  private initializeSearchIndex(): void {
    const options = {
      keys: ['title', 'seriesName'],
      threshold: 0.3,
      includeScore: true,
    }
    this.searchIndex = new Fuse(this.mediaFiles, options)
  }

  private handleFileSystemEvent(filePath: string, event: FileWatchEvent): void {
    console.log(`File system event: ${event} for ${filePath}`)

    switch (event) {
      case 'added':
        if (MediaParsingService.isSupportedFormat(filePath)) {
          this.processMediaFile(filePath).then(() => {
            this.initializeSearchIndex()
          })
        }
        break
      case 'removed':
        this.removeMediaFile(filePath)
        this.initializeSearchIndex()
        break
    }
  }

  private removeMediaFile(filePath: string): void {
    this.mediaFiles = this.mediaFiles.filter(item => item.filePath !== filePath)
  }

  private generateId(filePath: string): string {
    // Simple hash-based ID generation
    return Buffer.from(filePath).toString('base64').replace(/[/+=]/g, '')
  }
}
