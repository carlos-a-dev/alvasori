<template>
  <v-app id="alvasori">
    <nav-header />
    <v-main class="fill-height">
      <slot />
    </v-main>

    <v-footer
      class="text-red-darken-3 d-flex flex-column"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          variant="text"
        />
      </div>

      <v-divider />

      <div>
        {{ new Date().getFullYear() }} — <strong>AlvaSori</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>
