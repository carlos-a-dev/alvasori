<template>
  <v-app-bar
    flat
    v-scroll="onScroll"
    :class="{ 'opacity-90': transparent }"
  >
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
        class="me-4 "
        size="48"
        image="/Logo.png"
        :rounded="false"
      />

      <v-app-bar-title class="text-h4 font-weight-bold">
        <span class="text-red-accent-4">A</span>lva<span class="text-red-accent-4">S</span>ori
      </v-app-bar-title>

      <v-btn
        v-for="(link, index) in links"
        :key="index"
        :text="link.label"
        :to="link.to"
        variant="text"
      />

      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contactus' },
]

const transparent = ref(true)

function onScroll() {
  transparent.value !== (window.scrollY <= 5) && (transparent.value = !transparent.value)
}
</script>
