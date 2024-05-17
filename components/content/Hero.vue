<script setup lang="ts">
defineProps({
  src: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  height: {
    type: String,
    default: '600px',
    required: false,
  },
})
</script>

<template>
  <v-carousel
    height="600px"
    cycle
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="imgSrc in src"
      :key="imgSrc"
      :src="imgSrc"
      cover
    />
  </v-carousel>
</template>
