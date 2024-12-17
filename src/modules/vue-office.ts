import type { UserModule } from '@/types'

import '@js-preview/docx/lib/index.css'
import '@js-preview/excel/lib/index.css'

let jsPreviewDocx: any
let jsPreviewExcel: any
let jsPreviewPdf: any

export function getJsPreviewDocx() {
  return jsPreviewDocx
}

export function getJsPreviewExcel() {
  return jsPreviewExcel
}

export function getJsPreviewPdf() {
  return jsPreviewPdf
}

export const install: UserModule = ({ isClient, app }) => {
  if (isClient) {
    import('@vue-office/docx').then((VueOfficeDocx) => {
      app.use(VueOfficeDocx.default as any)
    })
    import('@vue-office/excel').then((VueOfficeExcel) => {
      app.use(VueOfficeExcel.default as any)
    })
    import('@vue-office/pdf').then((VueOfficePdf) => {
      app.use(VueOfficePdf.default as any)
    })

    import('@js-preview/docx').then((VueOfficeDocx) => {
      jsPreviewDocx = VueOfficeDocx.default
    })
    import('@js-preview/excel').then((VueOfficeExcel) => {
      jsPreviewExcel = VueOfficeExcel.default
    })
    import('@js-preview/pdf').then((VueOfficePdf) => {
      jsPreviewPdf = VueOfficePdf.default
    })
  }
}
