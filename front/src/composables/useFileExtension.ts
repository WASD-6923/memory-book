export function useFileExtension(fileName: string): string {
  switch (true) {
    case !!fileName.match('.txt'):
      return '/files/txt.svg'
    case !!(fileName.match('.doc') || fileName.match('.docx')):
      return '/files/docx.svg'
    case !!(fileName.match('.xls') || fileName.match('.xlsx')):
      return '/files/xls.svg'
    case !!fileName.match('.csv'):
      return '/files/csv.svg'
    case !!fileName.match('.json'):
      return '/files/json.svg'
    case !!fileName.match('.pdf'):
      return '/files/pdf.svg'
    case !!fileName.match('.zip'):
      return '/files/zip.svg'
    case !!fileName.match('.html'):
      return '/files/html.svg'
    case !!(fileName.match('.ppt') || fileName.match('.pptx')):
      return '/files/ppt.svg'
    case !!fileName.match('.png'):
      return '/files/png.svg'
    case !!(fileName.match('.jpg') || fileName.match('.jpeg')):
      return '/files/jpg.svg'
    default:
      return '/files/file.svg'
  }
}
