<template>
  <v-app id="alvasori">
    <layout-nav-header />

    <v-main class="fill-height pt-0">
      <slot />
    </v-main>

    <v-footer
      app
      class="text-red-darken-3 d-flex flex-column"
      absolute
    >
      <lazy-layout-social-btns />

      <v-divider />

      <div>
        {{ new Date().getFullYear() }} — <strong>AlvaSori</strong>
      </div>
    </v-footer>
  </v-app>
</template>
