// Application constants

export const APP_NAME = 'Privlix'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Your Private Media Library'

// UI Constants
export const NAVBAR_HEIGHT = 70
export const SIDEBAR_WIDTH = 250
export const MEDIA_CARD_ASPECT_RATIO = 16 / 9

// Media constants
export const SUPPORTED_VIDEO_FORMATS = [
  '.mp4',
  '.mkv',
  '.avi',
  '.mov',
  '.wmv',
  '.flv',
  '.webm',
  '.m4v',
] as const

export const SUPPORTED_SUBTITLE_FORMATS = ['.srt', '.vtt', '.ass', '.ssa'] as const

// Search constants
export const SEARCH_DEBOUNCE_DELAY = 300
export const MIN_SEARCH_LENGTH = 2
export const MAX_SEARCH_RESULTS = 50

// File size constants
export const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024 // 5MB
export const THUMBNAIL_CACHE_SIZE = 100 * 1024 * 1024 // 100MB

// UI breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  wide: 1600,
} as const

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

// Z-index layers
export const Z_INDEX = {
  dropdown: 1000,
  modal: 1100,
  toast: 1200,
  tooltip: 1300,
} as const

// Local storage keys
export const STORAGE_KEYS = {
  language: 'privlix-locale',
  theme: 'privlix-theme',
  mediaFolder: 'privlix-media-folder',
  watchProgress: 'privlix-watch-progress',
  settings: 'privlix-settings',
} as const

// API endpoints (if needed for future extensions)
export const API_ENDPOINTS = {
  // placeholder for future API endpoints
} as const

// Error messages
export const ERROR_MESSAGES = {
  FOLDER_ACCESS_DENIED: 'common.errors.folderAccessDenied',
  FILE_NOT_FOUND: 'common.errors.fileNotFound',
  UNSUPPORTED_FORMAT: 'common.errors.unsupportedFormat',
  SCAN_FAILED: 'common.errors.scanFailed',
} as const
