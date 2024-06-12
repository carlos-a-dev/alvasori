<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'
import type { ParsedContent } from '@nuxt/content/types'

const props = defineProps({
  name: String,
})

const blockStore = useBlockStore()

const parsedMarkdown = ref<ParsedContent>({ _id: '', body: { type: 'root', children: [] } })

watch(() => props.name, async (blockName) => {
  let content = ''
  if (blockName) {
    try {
      const block = await blockStore.fetchBlock(blockName ?? '')
      content = block?.content ?? ''
    }
    catch (err) {
      console.error(err)
    }
  }

  if (markdownParser.parse !== undefined) {
    parsedMarkdown.value = await markdownParser.parse(`${blockName}.block.md`, content, {})
  }
}, { immediate: true })
</script>

<template>
  <v-container
    fluid
    v-bind="$attrs"
    class="pa-0"
  >
    <ContentRendererMarkdown
      :value="parsedMarkdown"
    />
  </v-container>
</template>
