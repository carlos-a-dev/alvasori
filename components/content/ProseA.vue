<template>
  <v-btn
    :href="href"
    :target="target"
    variant="plain"
  >
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </v-btn>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>
