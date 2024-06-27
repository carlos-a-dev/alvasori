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
      :title="title"
      :subtitle="subtitle"
    >
      <template
        v-if="$slots.append"
        #append
      >
        <slot name="append" />
      </template>
      <template #text>
        <slot />
      </template>
    </v-card>
  </v-container>
</template>
