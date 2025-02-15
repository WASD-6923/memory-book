export function useObjectToUrl(obj: Object): string {
  let response = ''
  Object.keys(obj).forEach((o, index) => {
    if (obj[o]) {
      response += (index > 0 ? '&' : '?') + o + '=' + obj[o]
    }
  })
  return response
}
