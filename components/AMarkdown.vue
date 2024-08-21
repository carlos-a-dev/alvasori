<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'
import type { ParsedContent } from '@nuxt/content/types'

interface Props {
  value: string | ParsedContent
  documentId?: string
  unwrap?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  documentId: '',
})

const parsedValue = ref<ParsedContent>({ _id: '', body: { type: 'root', children: [] } })

function unwrapContent(content: ParsedContent, tag: string) {
  if (
    content.body?.children[0] !== undefined
    && content.body?.children[0].tag === tag
    && content.body?.children[0].children !== undefined
  ) {
    content.body.children = content.body?.children[0].children
  }

  return content
}

watch(() => props.value, async (newValue) => {
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
    if (props.unwrap !== undefined) {
      parsedValue.value = unwrapContent(parsedValue.value, props.unwrap)
    }
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
