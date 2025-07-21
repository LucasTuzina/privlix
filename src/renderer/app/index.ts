import { createApp } from 'vue'
import App from '../App.vue'
import { getEnvironmentConfig } from '../config/app'
import { registerPlugins } from '../plugins'
import router from '../router'
import pinia from '../store'
import i18n from '../i18n'

// Global error handler
const handleError = (error: unknown, instance: unknown, info: string) => {
  console.error('Vue Error:', error)
  console.error('Component:', instance)
  console.error('Info:', info)

  // Here you could send errors to a logging service
  // logError(error, instance, info)
}

export const createPrivlixApp = () => {
  // Create Vue app instance
  const app = createApp(App)

  // Get environment configuration
  const envConfig = getEnvironmentConfig()

  // Global error handling
  app.config.errorHandler = handleError

  // Performance tracking based on environment
  if (envConfig.performance) {
    app.config.performance = true
  }

  // Register plugins
  registerPlugins(app)

  return { app, pinia, router, i18n }
}

export default createPrivlixApp
