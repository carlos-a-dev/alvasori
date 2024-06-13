<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types'

definePageMeta({
  middleware: ['content'],
})
const doc = useState<ParsedContent>('content_rendered')
useContentHead(doc)
</script>

<template>
  <a-markdown
    :value="doc"
    class="w-100 fill-height"
  />
</template>
