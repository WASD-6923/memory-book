export const useFormatDate = (date: string, locale = 'ru', options?: Intl.DateTimeFormatOptions): string => {
  return new Intl.DateTimeFormat(locale + '-' + locale.toUpperCase(), options).format(new Date(date))
}
