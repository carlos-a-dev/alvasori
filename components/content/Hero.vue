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
    :height="height"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="imgSrc in src"
      :key="imgSrc"
      :src="imgSrc"
      cover
    >
      <v-container class="d-flex justify-center align-center h-100">
        <v-card
          color="grey-darken-4"
          class="text-center opacity-70"
        >
          <template #text>
            <h1 class="text-h2 text-white">
              Empowering Your Business with Education and Technology
            </h1>

            <p class="text-h4 text-grey-lighten-1">
              Expert financial education, innovative web solutions, and comprehensive e-commerce services.
            </p>
          </template>
        </v-card>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>
