<script setup lang="ts">
const networks = [
  {
    icon: 'mdi-facebook',
    link: 'https://www.facebook.com/alvasori',
  },
  {
    icon: 'mdi-linkedin',
    link: 'https://www.linkedin.com/alvasori',
  },
  {
    icon: 'mdi-instagram',
    link: 'https://www.instagram.com/alvasori',
  },
]
</script>

<template>
  <div>
    <v-btn
      v-for="(network, index) in networks"
      :key="index"
      :icon="network.icon"
      :href="network.link"
      class="mx-4"
      variant="text"
    />
  </div>
</template>
