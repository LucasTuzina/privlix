// Global type definitions for the renderer process

// Vue SFC declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    electronAPI: {
      // Media management
      selectMediaFolder: () => Promise<string | null>
      getMediaLibrary: () => Promise<any[]>
      getMediaStats: () => Promise<any>
      searchMedia: (query: string) => Promise<any[]>
      getRecentlyWatched: () => Promise<any[]>
      
      // Playback
      updateWatchProgress: (mediaId: string, progress: number, timestamp: number) => Promise<void>
      getVideoInfo: (filePath: string) => Promise<any>
      
      // File system
      getFilePath: (filePath: string) => string
      getThumbnailPath: (thumbnailPath: string | null) => string | null
    }
  }
}

// Vue Router meta fields
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    hideNavigation?: boolean
    requiresAuth?: boolean
  }
}

// Extend Vue global properties for i18n
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: any) => string
    $tc: (key: string, count?: number, values?: any) => string
    $te: (key: string) => boolean
  }
}

export {}
