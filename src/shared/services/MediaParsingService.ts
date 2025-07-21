import path from 'path'
import type { MediaParsingResult } from '../types/MediaTypes'

export class MediaParsingService {
  private static readonly SERIES_PATTERNS = [
    /^(.+?)[.\s]+[Ss](\d+)[Ee](\d+)/, // Series.S01E01
    /^(.+?)[.\s]+(\d+)x(\d+)/, // Series.1x01
    /^(.+?)[.\s]+Season[.\s]*(\d+)[.\s]*Episode[.\s]*(\d+)/i,
  ]

  /**
   * Parse media info from filename
   */
  static parseMediaInfo(fileName: string): MediaParsingResult {
    // Remove file extension
    const cleanName = this.removeFileExtension(fileName)

    // Try to match series patterns
    for (const pattern of this.SERIES_PATTERNS) {
      const match = cleanName.match(pattern)
      if (match) {
        return {
          title: this.cleanTitle(match[1]),
          type: 'episode',
          seriesName: this.cleanTitle(match[1]),
          seasonNumber: parseInt(match[2]),
          episodeNumber: parseInt(match[3]),
        }
      }
    }

    // Default to movie
    return {
      title: this.cleanTitle(cleanName),
      type: 'movie',
    }
  }

  private static removeFileExtension(fileName: string): string {
    return path.parse(fileName).name
  }

  private static cleanTitle(title: string): string {
    return title
      .replace(/[._]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\b\d{4}\b/g, '') // Remove year
      .replace(/\b(720p|1080p|4K|HDRip|BRRip|WEBRip|HDTV)\b/gi, '')
      .trim()
  }
}
