<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()

const fileName = ref('')
const src = ref()
const { open, onChange } = useFileDialog()
onChange((files) => {
  if (files?.length) {
    fileName.value = files[0].name
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(files[0])
    fileReader.onload = () => {
      src.value = fileReader.result
    }
  }
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        m-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>

    <button
      m-3 text-sm btn
      @click="open"
    >
      上传文件
    </button>

    <div>没有transition</div>
    <vue-office-pdf
      v-if="fileName.endsWith('.pdf')"
      :src="src"
    />
    <vue-office-docx v-else-if="fileName.endsWith('.docx')" :src="src" />
    <vue-office-excel v-else-if="fileName.endsWith('.xlsx')" :src="src" />

    <div>有transition，build后preview渲染不正确</div>
    <transition>
      <vue-office-pdf
        v-if="fileName.endsWith('.pdf')"
        :src="src"
      />
      <vue-office-docx v-else-if="fileName.endsWith('.docx')" :src="src" />
      <vue-office-excel v-else-if="fileName.endsWith('.xlsx')" :src="src" />
    </transition>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
