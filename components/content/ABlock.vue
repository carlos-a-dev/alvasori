<script setup lang="ts">
import AMarkdown from '../AMarkdown.vue'
import type { Block } from '@/stores/useBlockStore'

const props = defineProps({
  name: String,
})

const blockStore = useBlockStore()

const block = ref<Block | null>(null)

watch(() => props.name, async (blockName) => {
  if (blockName) {
    try {
      block.value = await blockStore.fetchBlock(blockName ?? '')
    }
    catch (err) {
      console.error(err)
    }
  }
}, { immediate: true })
</script>

<template>
  <a-markdown
    v-if="block?.content"
    v-bind="$attrs"
    :value="block?.content"
  />
</template>
