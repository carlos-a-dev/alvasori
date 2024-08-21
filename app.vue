<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '48x48' },
    // { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
    // { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png' },
    // { rel: 'android-chrome', type: 'image/png', href: '/android-chrome-192x192.png' },
    // { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
