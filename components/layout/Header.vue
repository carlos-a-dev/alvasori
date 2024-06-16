<!-- eslint-disable vue/multi-word-component-names -->
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

<template>
  <v-app-bar
    v-scroll="onScroll"
    flat
    class="my-nav"
    :class="{ 'my-nav-transparent': transparent }"
    color="grey-darken-4"
  >
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
        class="me-4 "
        size="48"
        image="/Logo.webp"
        :rounded="false"
      />

      <v-app-bar-title class="text-h4 font-weight-bold">
        <app-name />
      </v-app-bar-title>

      <v-btn
        v-for="(link, index) in links"
        :key="index"
        :text="link.label"
        :to="link.to"
        rounded
        variant="text"
      />

      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.my-nav {
  opacity: 0.95;
  -webkit-transition: opacity 0.2s ease-in-out;
  -moz-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
}

.my-nav-transparent {
  opacity: 0.7!important;
}
</style>
