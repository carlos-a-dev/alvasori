<script setup lang="ts">
const props = defineProps<{ socialNetworks?: Array<{ icon: string, link: string }> }>()

const networks = ref(props.socialNetworks ?? await useConfigStore().getConfigValue('social-networks', []))
</script>

<template>
  <v-btn-group class="text-red-darken-3">
    <v-btn
      v-for="(network, index) in networks"
      :key="index"
      :icon="network.icon"
      :href="network.link"
      class="mx-4"
      variant="text"
    />
  </v-btn-group>
</template>
