/* eslint-disable */
// @ts-nocheck
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    VueOfficeDocx: typeof import('@vue-office/docx')['default']
    VueOfficeExcel: typeof import('@vue-office/excel')['default']
    VueOfficePdf: typeof import('@vue-office/pdf')['default']
  }
}
