<script setup lang="ts">
defineProps<{
  id?: string
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
</script>

<template>
  <component
    :is="tag"
    :id="id"
    :class="'text-' + tag"
    class="mt-4 mb-2"
  >
    <slot />
  </component>
</template>
