declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}
export const useDownload = (
  data: BlobPart,
  fileName = 'null',
  mimeType = 'application/x-zip',
) => {
  const blob = new Blob([data], { type: mimeType })
  // IE browser
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, fileName)
    return
  }
  // Other browsers
  const blobURL = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = blobURL
  link.setAttribute('download', fileName)

  if (typeof link.download === 'undefined') {
    link.setAttribute('target', '_blank')
  }
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => {
    window.URL.revokeObjectURL(blobURL)
  }, 100)
}
