<script setup lang="ts">
const { data: socialNetworks } = await useAsyncData('socialNetworks', () => useConfigStore().getConfigValue('social-networks', []))
</script>

<template>
  <v-btn-group class="text-red-darken-3">
    <v-btn
      v-for="(network, index) in socialNetworks"
      :key="index"
      :icon="network.icon"
      :href="network.link"
      class="mx-4"
      variant="text"
    />
  </v-btn-group>
</template>
