import type { UserModule } from '@/types'

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
  }
}
