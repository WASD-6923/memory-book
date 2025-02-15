export async function loadLocale(locale: string) {
  return await import(`./locales/${locale}.json`)
}
