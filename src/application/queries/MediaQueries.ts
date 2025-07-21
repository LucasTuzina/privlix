import type { MediaLibrary, MediaStats, SearchResult, MediaFile } from '@domain/entities/MediaTypes'
import type { IMediaRepository } from '@domain/repositories/IMediaRepository'

/* eslint-disable no-unused-vars */
export interface IMediaQueries {
  getMediaLibrary(): Promise<MediaLibrary>
  getMediaStats(): Promise<MediaStats>
  searchMedia(_query: string): Promise<SearchResult<MediaFile>[]>
  getRecentlyWatched(_limit?: number): Promise<MediaFile[]>
  getMediaById(_id: string): Promise<MediaFile | null>
}
/* eslint-enable no-unused-vars */

export class MediaQueries implements IMediaQueries {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly _mediaRepository: IMediaRepository) {}

  async getMediaLibrary(): Promise<MediaLibrary> {
    return await this._mediaRepository.getLibrary()
  }

  async getMediaStats(): Promise<MediaStats> {
    const library = await this._mediaRepository.getLibrary()

    const totalMovies = library.movies.length
    const totalSeries = library.series.length
    const totalEpisodes = library.series.reduce(
      (sum: number, series) => sum + series.totalEpisodes,
      0
    )
    const totalFiles = totalMovies + totalEpisodes
    const totalSize = [...library.movies, ...library.series.flatMap(s => s.episodes)].reduce(
      (sum, media) => sum + media.fileSize,
      0
    )

    return {
      totalMovies,
      totalSeries,
      totalEpisodes,
      totalFiles,
      totalSize,
    }
  }

  async searchMedia(query: string): Promise<SearchResult<MediaFile>[]> {
    if (!query.trim()) {
      return []
    }
    return await this._mediaRepository.search(query)
  }

  async getRecentlyWatched(limit: number = 10): Promise<MediaFile[]> {
    return await this._mediaRepository.getRecentlyWatched(limit)
  }

  async getMediaById(id: string): Promise<MediaFile | null> {
    return await this._mediaRepository.findById(id)
  }
}
