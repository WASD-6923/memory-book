export function useTrimString(str: string = '', length: number = 20) {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  }
  return str
}
