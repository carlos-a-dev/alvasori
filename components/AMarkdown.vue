<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'
import type { ParsedContent } from '@nuxt/content/types'
import { watch, ref, toRef } from 'vue'

interface Props {
  value: string | ParsedContent
  documentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  documentId: '',
})

const value = toRef(props, 'value')

const parsedValue = ref<ParsedContent>({ _id: '', body: { type: 'root', children: [] } })

watch(value, async (newValue) => {
  if (typeof newValue !== 'string') {
    parsedValue.value = newValue
    return
  }

  if (markdownParser.parse === undefined) {
    console.error('Markdown parser is not initialized')
    return
  }

  try {
    parsedValue.value = await markdownParser.parse(props.documentId, newValue ?? '', {})
  }
  catch (error) {
    console.error('Error parsing markdown:', error)
  }
}, { immediate: true })
</script>

<template>
  <ContentRendererMarkdown
    :value="parsedValue"
  />
</template>
