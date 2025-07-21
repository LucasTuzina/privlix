import { defineStore } from 'pinia'
import type {
  MediaLibrary,
  MediaStats,
  MediaFile,
  Series,
  SearchResult,
} from '@domain/entities/MediaTypes'

export interface MediaStoreState {
  mediaLibrary: MediaLibrary
  mediaStats: MediaStats
  recentlyWatched: MediaFile[]
  searchResults: SearchResult<MediaFile>[]
  isLoading: boolean
  selectedFolder: string | null
  currentQuery: string
}

export const useMediaStore = defineStore('media', {
  state: (): MediaStoreState => ({
    mediaLibrary: {
      movies: [],
      series: [],
    },
    mediaStats: {
      totalMovies: 0,
      totalSeries: 0,
      totalEpisodes: 0,
      totalFiles: 0,
      totalSize: 0,
    },
    recentlyWatched: [],
    searchResults: [],
    isLoading: false,
    selectedFolder: null,
    currentQuery: '',
  }),

  getters: {
    // Alphabetically sorted movies
    moviesSorted(): MediaFile[] {
      return this.mediaLibrary.movies.sort((a, b) =>
        a.title.localeCompare(b.title, 'en', { numeric: true })
      )
    },

    // Alphabetically sorted series
    seriesSorted(): Series[] {
      return this.mediaLibrary.series.sort((a: Series, b: Series) =>
        a.name.localeCompare(b.name, 'en', { numeric: true })
      )
    },

    // All media combined for search
    allMedia(): MediaFile[] {
      const movies = this.mediaLibrary.movies
      const seriesEpisodes = this.mediaLibrary.series.flatMap(s => s.episodes)
      return [...movies, ...seriesEpisodes]
    },
  },

  actions: {
    async selectMediaFolder(): Promise<void> {
      this.isLoading = true
      try {
        const folderPath = await window.electronAPI.selectMediaFolder()
        if (folderPath) {
          this.selectedFolder = folderPath
          await this.loadMediaLibrary()
          this.showNotification('Media folder selected successfully', 'success')
        }
      } catch (error) {
        console.error('Error selecting media folder:', error)
        this.showNotification('Error selecting folder', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async loadMediaLibrary(): Promise<void> {
      this.isLoading = true
      try {
        const [library, stats] = await Promise.all([
          window.electronAPI.getMediaLibrary(),
          window.electronAPI.getMediaStats(),
        ])
        this.mediaLibrary = library
        this.mediaStats = stats
        await this.loadRecentlyWatched()
      } catch (error) {
        console.error('Error loading media library:', error)
        this.showNotification('Error loading media library', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async loadRecentlyWatched(): Promise<void> {
      try {
        this.recentlyWatched = await window.electronAPI.getRecentlyWatched()
      } catch (error) {
        console.error('Error loading recently watched:', error)
      }
    },

    async searchMedia(query: string): Promise<void> {
      if (!query.trim()) {
        this.searchResults = []
        this.currentQuery = ''
        return
      }

      this.currentQuery = query
      this.isLoading = true

      try {
        this.searchResults = await window.electronAPI.searchMedia(query)
      } catch (error) {
        console.error('Error searching media:', error)
        this.showNotification('Search error', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async updateWatchProgress(mediaId: string, progress: number): Promise<void> {
      try {
        await window.electronAPI.updateWatchProgress(mediaId, progress, Date.now())
        await this.loadRecentlyWatched()
      } catch (error) {
        console.error('Error updating watch progress:', error)
      }
    },

    // Helper methods
    getMediaById(id: string): MediaFile | undefined {
      return this.allMedia.find(media => media.id === id)
    },

    getThumbnailUrl(thumbnailPath?: string): string | null {
      return thumbnailPath ? window.electronAPI.getThumbnailPath(thumbnailPath) : null
    },

    getVideoUrl(filePath: string): string {
      return window.electronAPI.getFilePath(filePath)
    },

    formatDuration(seconds?: number): string {
      if (!seconds) return '0:00'

      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = Math.floor(seconds % 60)

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`
      }
    },

    formatFileSize(bytes?: number): string {
      if (!bytes) return '0 B'

      const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
    },

    showNotification(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
      // Notification Store will be implemented later
      console.log(`${type.toUpperCase()}: ${message}`)
    },
  },
})
