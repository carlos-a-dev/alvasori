<script setup lang="ts">
const links = [
  [],
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'About Us',
      icon: 'i-heroicons-chart-bar',
      to: '/about',
    },
  ],
  [],
]
</script>

<template>
  <UHorizontalNavigation :links="links" />
</template>
