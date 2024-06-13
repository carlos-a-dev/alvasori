<script setup lang="ts">
import type { Block } from '@/stores/useBlockStore.js'

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
  <a-markdown :value="block?.content ?? ''" />
</template>
