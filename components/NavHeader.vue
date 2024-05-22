<template>
  <v-app-bar
    v-scroll="onScroll"
    flat
    class="my-nav"
    :class="{ 'my-nav-transparent': transparent }"
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

const onScroll = debounce(() => {
  transparent.value !== (window.scrollY <= 5) && (transparent.value = !transparent.value)
}, 100)
</script>

<style scoped>
.my-nav {
  opacity: 1;
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
}

.my-nav-transparent {
  opacity: 0.9!important;
}
</style>
