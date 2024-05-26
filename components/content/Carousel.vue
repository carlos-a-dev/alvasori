<script setup lang="ts">
interface ISlide {
  src: string
  title?: string
  subtitle?: string
}

defineProps({
  slides: {
    type: Array as PropType<ISlide[]>,
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
    cycle
  >
    <v-carousel-item
      v-for="(slide, index) in slides"
      :key="index"
      :src="slide.src"
      cover
    >
      <v-container class="d-flex justify-center align-center h-100">
        <v-card
          color="grey-darken-4"
          class="text-center opacity-70"
        >
          <template
            v-if="slide.title || slide.subtitle"
            #text
          >
            <h1 class="text-h2 text-white">
              {{ slide.title }}
            </h1>

            <p class="text-h4 text-grey-lighten-1">
              {{ slide.subtitle }}
            </p>
          </template>
        </v-card>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>
