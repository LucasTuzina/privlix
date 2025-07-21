import type { MediaType } from '../entities/MediaTypes'

export interface MediaParsingResult {
  title: string
  type: MediaType
  seriesName?: string
  seasonNumber?: number
  episodeNumber?: number
}

export class MediaParsingService {
  private static readonly SERIES_PATTERNS = [
    /^(.+?)[.\s]+[Ss](\d+)[Ee](\d+)/, // Series.S01E01
    /^(.+?)[.\s]+(\d+)x(\d+)/, // Series.1x01
    /^(.+?)[.\s]+Season[.\s]*(\d+)[.\s]*Episode[.\s]*(\d+)/i,
  ]

  private static readonly SUPPORTED_FORMATS = [
    '.mp4',
    '.mkv',
    '.avi',
    '.mov',
    '.wmv',
    '.flv',
    '.webm',
    '.m4v',
  ]

  static parseMediaInfo(
    fileName: string,
    // eslint-disable-next-line no-unused-vars
    _directoryName: string,
    // eslint-disable-next-line no-unused-vars
    _filePath: string
  ): MediaParsingResult {
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

    // Check if multiple videos in same directory (series)
    // This would require file system access, so we'll handle it in the service layer

    // Default to movie
    return {
      title: this.cleanTitle(cleanName),
      type: 'movie',
    }
  }

  static isSupportedFormat(fileName: string): boolean {
    const ext = this.getFileExtension(fileName).toLowerCase()
    return this.SUPPORTED_FORMATS.includes(ext)
  }

  private static removeFileExtension(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '')
  }

  private static getFileExtension(fileName: string): string {
    const match = fileName.match(/\.[^/.]+$/)
    return match ? match[0] : ''
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
