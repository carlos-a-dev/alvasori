<template>
  <v-app id="alvasori">
    <nav-header />
    <v-main class="fill-height">
      <slot />
    </v-main>

    <v-footer
      class="text-red-darken-3 d-flex flex-column"
    >
      <lazy-social-btns />

      <v-divider />

      <div>
        {{ new Date().getFullYear() }} — <strong>AlvaSori</strong>
      </div>
    </v-footer>
  </v-app>
</template>
