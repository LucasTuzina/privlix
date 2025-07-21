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
      selectMediaFolder: () => Promise<string | null>
      watchFiles: (folderPath: string) => Promise<void>
      scanMediaFiles: (folderPath: string) => Promise<any[]>
      getFileStats: (filePath: string) => Promise<any>
      openFile: (filePath: string) => Promise<void>
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
