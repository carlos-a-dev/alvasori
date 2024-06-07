<template>
  <pre
    :class="$props.class"
    class="border-thin rounded-lg bg-yellow-lighten-4 pa-2 my-2"
  ><span
    v-if="filename"
    class="border-thin rounded-pill bg-yellow-lighten-4 position-absolute px-2 mt-n5 text-body-2"
  >{{ filename }}</span><v-btn
  :prepend-icon="copyBtnText === '' ? 'mdi-content-copy' : ''"
  :readonly="copyBtnText !== ''"
  variant="plain"
  class="float-right mr-4 text-none"
  title="Copy Code"
  size="xs"
  :text="copyBtnText"
  density="compact"
  @click="copyCode()"
  /><slot /></pre>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copyBtnText = ref('')

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  console.log('Here')
  copyBtnText.value = 'Copied!'
  setTimeout(() => {
    copyBtnText.value = ''
  }, 2000)
}
</script>

  <style>
  pre code .line {
    display: block;
  }

  pre code .line.highlight {
    background-color: rgba(0, 0, 255, 0.3);

  }
  </style>
