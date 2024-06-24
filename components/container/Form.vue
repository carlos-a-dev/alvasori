<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  back?: string
}>()
</script>

<template>
  <v-container>
    <v-card
      flat
      :title="title"
      :subtitle="subtitle"
    >
      <template
        v-if="back"
        #prepend
      >
        <v-btn
          v-tooltip="'Back'"
          flat
          icon="mdi-arrow-left"
          :to="back"
        />
      </template>

      <template #text>
        <slot />
      </template>
    </v-card>
  </v-container>
</template>
