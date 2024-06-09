<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types'

const doc = useState<ParsedContent>('parsed-content', () => ({ _id: 'none', body: { type: 'root', children: [] } }))

definePageMeta({
  middleware: ['content'],
})
useContentHead(doc)
</script>

<template>
  <ContentRenderer
    :value="doc"
  >
    <ContentRendererMarkdown
      :value="doc"
      class="w-100 fill-height"
    />
  </ContentRenderer>
</template>
