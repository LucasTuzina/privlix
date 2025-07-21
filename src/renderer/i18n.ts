import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

export type MessageLanguages = keyof typeof messages
export type MessageSchema = typeof en

const messages = {
  en,
  de,
}

// Get saved language from localStorage or default to browser language
const getDefaultLocale = (): string => {
  const savedLocale = localStorage.getItem('privlix-locale')
  if (savedLocale && Object.keys(messages).includes(savedLocale)) {
    return savedLocale
  }

  // Check browser language
  const browserLocale = navigator.language.split('-')[0]
  if (Object.keys(messages).includes(browserLocale)) {
    return browserLocale
  }

  // Default to English
  return 'en'
}

export const i18n = createI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  legacy: true,
  globalInjection: true,
  messages,
})

// Function to change language and persist in localStorage
export const setLocale = (locale: string) => {
  i18n.global.locale = locale as 'en' | 'de'
  localStorage.setItem('privlix-locale', locale)
  document.documentElement.lang = locale
}

// Get current locale
export const getCurrentLocale = (): string => {
  return i18n.global.locale as string
}

// Get available locales
export const getAvailableLocales = (): string[] => {
  return Object.keys(messages)
}

export default i18n
