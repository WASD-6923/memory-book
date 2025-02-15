import i18n from '@/i18n/index.js'
import { nextTick } from 'vue'
import { useTitle } from '@vueuse/core'
import { loadLocale } from '@/i18n/localesLoader.ts'

const title = useTitle()
const Trans = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES?.split(',')
  },

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  t(key: string) {
    return i18n.global.t(key)
  },

  async switchLanguage(newLocale: string) {
    console.log(newLocale)
    await Trans.loadLocaleMessages(newLocale)
    Trans.currentLocale = newLocale
    document.querySelector('html')?.setAttribute('lang', newLocale)
    title.value = Trans.t('common.mainTitle')
    if (newLocale === 'ar') {
      document.querySelector('html')?.setAttribute('dir', 'rtl')
    } else {
      document.querySelector('html')?.setAttribute('dir', 'ltr')
    }
    localStorage.setItem('user-locale', newLocale)
  },

  async loadLocaleMessages(locale: string) {
    if (!i18n.global.availableLocales.includes(locale)) {
      //const messages = await import(`@/i18n/locales/${locale}.json`)
      const messages = await loadLocale(locale)
      i18n.global.setLocaleMessage(locale, messages.default)
    }

    return nextTick()
  },

  isLocaleSupported(locale: string) {
    return Trans.supportedLocales.includes(locale)
  },

  getUserLocale() {
    const locale =
      window.navigator.language ||
      //window.navigator.userLanguage ||
      Trans.defaultLocale

    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0],
    }
  },

  getPersistedLocale() {
    const persistedLocale = localStorage.getItem('user-locale')

    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale()
    if (userPersistedLocale) {
      return userPersistedLocale
    }

    const userPreferredLocale = Trans.getUserLocale()

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }

    return Trans.defaultLocale
  },

  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale

    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale())
    }

    await Trans.switchLanguage(paramLocale)

    return next()
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params,
      },
    }
  },
}

export default Trans
