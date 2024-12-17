<script setup lang="ts">
import { getJsPreviewDocx, getJsPreviewExcel, getJsPreviewPdf } from '~/modules/vue-office'
import '@js-preview/docx/lib/index.css'
import '@js-preview/excel/lib/index.css'

defineOptions({
  name: 'IndexPage',
})

const div1 = ref<HTMLElement>()
const div2 = ref<HTMLElement>()

const fileName = ref('')
const { open, onChange } = useFileDialog()
onChange((files) => {
  if (files?.length) {
    // eslint-disable-next-line ts/no-unused-expressions
    div1.value && (div1.value.innerHTML = '')
    // eslint-disable-next-line ts/no-unused-expressions
    div2.value && (div2.value.innerHTML = '')
    fileName.value = files[0].name
    nextTick(() => {
      if (fileName.value.endsWith('.docx')) {
        const myDocxPreviewer1 = getJsPreviewDocx().init(div1.value!)
        const myDocxPreviewer2 = getJsPreviewDocx().init(div2.value!)
        myDocxPreviewer1.preview(files[0])
        myDocxPreviewer2.preview(files[0])
      }
      else if (fileName.value.endsWith('.pdf')) {
        const myPdfPreviewer1 = getJsPreviewPdf().init(div1.value!)
        const myPdfPreviewer2 = getJsPreviewPdf().init(div2.value!)
        myPdfPreviewer1.preview(files[0])
        myPdfPreviewer2.preview(files[0])
      }
      else {
        const myExcelPreviewer1 = getJsPreviewExcel().init(div1.value!)
        const myExcelPreviewer2 = getJsPreviewExcel().init(div2.value!)
        myExcelPreviewer1.preview(files[0])
        myExcelPreviewer2.preview(files[0])
      }
    })
  }
})
</script>

<template>
  <div>
    <button
      m-3 text-sm btn
      @click="open"
    >
      上传文件
    </button>

    <div>没有transition</div>
    <div v-if="fileName" ref="div1" class="h-30vh w-50vw" />

    <div>有transition</div>
    <transition>
      <div v-if="fileName" ref="div2" class="h-30vh w-50vw" />
    </transition>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
