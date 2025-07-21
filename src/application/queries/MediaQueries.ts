import type { MediaLibrary, MediaStats, SearchResult, MediaFile } from '@domain/entities/MediaTypes';
import type { IMediaRepository } from '@domain/repositories/IMediaRepository';

export interface IMediaQueries {
  getMediaLibrary(): Promise<MediaLibrary>;
  getMediaStats(): Promise<MediaStats>;
  searchMedia(query: string): Promise<SearchResult<MediaFile>[]>;
  getRecentlyWatched(limit?: number): Promise<MediaFile[]>;
  getMediaById(id: string): Promise<MediaFile | null>;
}

export class MediaQueries implements IMediaQueries {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async getMediaLibrary(): Promise<MediaLibrary> {
    return await this.mediaRepository.getLibrary();
  }

  async getMediaStats(): Promise<MediaStats> {
    const library = await this.mediaRepository.getLibrary();
    
    const totalMovies = library.movies.length;
    const totalSeries = library.series.length;
    const totalEpisodes = library.series.reduce((sum, series) => sum + series.totalEpisodes, 0);
    const totalFiles = totalMovies + totalEpisodes;
    const totalSize = [...library.movies, ...library.series.flatMap(s => s.episodes)]
      .reduce((sum, media) => sum + media.fileSize, 0);

    return {
      totalMovies,
      totalSeries,
      totalEpisodes,
      totalFiles,
      totalSize
    };
  }

  async searchMedia(query: string): Promise<SearchResult<MediaFile>[]> {
    if (!query.trim()) {
      return [];
    }
    return await this.mediaRepository.search(query);
  }

  async getRecentlyWatched(limit: number = 10): Promise<MediaFile[]> {
    return await this.mediaRepository.getRecentlyWatched(limit);
  }

  async getMediaById(id: string): Promise<MediaFile | null> {
    return await this.mediaRepository.findById(id);
  }
}
