// Plugin registration and configuration
import type { App } from 'vue'
import router from '../router'
import pinia from '../store'
import i18n from '../i18n'

// Register all plugins with the Vue app
export const registerPlugins = (app: App) => {
  // Router plugin
  app.use(router)

  // State management (Pinia)
  app.use(pinia)

  // Internationalization
  app.use(i18n)

  // Add other plugins here as needed
  // app.use(someOtherPlugin)
}

export default registerPlugins
