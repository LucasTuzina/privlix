// Application configuration constants
export const appConfig = {
  name: 'Privlix',
  version: '1.0.0',
  description: 'Your Private Media Library',
  
  // Environment settings
  development: {
    performance: true,
    devtools: true,
    logLevel: 'debug'
  },
  
  production: {
    performance: false,
    devtools: false,
    logLevel: 'error'
  }
} as const

// Get environment-specific configuration
export const getEnvironmentConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  return isDev ? appConfig.development : appConfig.production
}

export default appConfig
