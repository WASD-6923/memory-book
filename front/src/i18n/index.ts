import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
//import { ref } from 'vue'
import es from './locales/es.json'
import en from './locales/en.json'
import ru from './locales/ru.json'

const [lang] = navigator.language.split('-')
const langStore = useLocalStorage(
  'user-locale',
  import.meta.env.VITE_SUPPORTED_LOCALES.split(',')?.includes(lang) ? import.meta.env.VITE_DEFAULT_LOCALE : lang,
)

/*async function loadLocale(locale: string) {
  return await import(`./locales/${locale}.json`)
}*/

/*const es = ref()
const en = ref()
const ru = ref()

;(async () => {
  es.value = await loadLocale('es')
  en.value = await loadLocale('en')
  ru.value = await loadLocale('ru')
})()*/

export default createI18n({
  locale: langStore.value,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    es: es,
    en: en,
    ru: ru,
  },
  globalInjection: true,
})
