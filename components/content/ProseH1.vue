<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <prose-h
    :id="id"
    tag="h1"
  >
    <slot />
  </prose-h>
</template>
