import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { app } from 'electron'

export interface AppSettings {
  selectedMediaFolder?: string
  language?: 'en' | 'de'
  theme?: 'dark' | 'light'
  autoplay?: boolean
  volume?: number
}

/**
 * Service for persistent app settings
 */
export class SettingsService {
  private settingsPath: string
  private settings: AppSettings

  constructor() {
    // Store settings in userData directory
    const userDataPath = app.getPath('userData')
    this.settingsPath = join(userDataPath, 'data', 'privlix-settings.json')
    this.settings = this.loadSettings()
  }

  /**
   * Load settings from file
   */
  private loadSettings(): AppSettings {
    try {
      if (existsSync(this.settingsPath)) {
        const data = readFileSync(this.settingsPath, 'utf-8')
        return JSON.parse(data)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }

    // Default settings
    return {
      language: 'en',
      theme: 'dark',
      autoplay: true,
      volume: 1.0,
    }
  }

  /**
   * Save settings to file
   */
  private saveSettings(): void {
    try {
      const settingsDir = join(this.settingsPath, '..')
      if (!existsSync(settingsDir)) {
        mkdirSync(settingsDir, { recursive: true })
      }

      writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2))
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  /**
   * Get all settings
   */
  getSettings(): AppSettings {
    return { ...this.settings }
  }

  /**
   * Set a single setting
   */
  setSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
    this.settings[key] = value
    this.saveSettings()
  }

  /**
   * Update multiple settings
   */
  updateSettings(newSettings: Partial<AppSettings>): void {
    this.settings = { ...this.settings, ...newSettings }
    this.saveSettings()
  }

  /**
   * Get selected media folder
   */
  getSelectedMediaFolder(): string | undefined {
    return this.settings.selectedMediaFolder
  }

  /**
   * Set selected media folder
   */
  setSelectedMediaFolder(folderPath: string | undefined): void {
    this.setSetting('selectedMediaFolder', folderPath)
  }

  /**
   * Unlink media folder
   */
  unlinkMediaFolder(): void {
    this.setSetting('selectedMediaFolder', undefined)
  }

  /**
   * Set language
   */
  setLanguage(language: 'en' | 'de'): void {
    this.setSetting('language', language)
  }

  /**
   * Get language
   */
  getLanguage(): 'en' | 'de' {
    return this.settings.language || 'en'
  }
}
