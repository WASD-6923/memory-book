export const useFormatNumber = (number: number | undefined) => {
  return number ? number?.toLocaleString('ru-RU') : ''
}
