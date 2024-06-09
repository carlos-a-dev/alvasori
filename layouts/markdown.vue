<template>
  <v-app id="alvasori">
    <layout-nav-header />

    <v-main class="fill-height">
      <layout-app-alerts />
      <v-container class="fill-height align-start">
        <slot />
      </v-container>
    </v-main>

    <v-footer
      app
      class="text-red-darken-3 d-flex flex-column"
    >
      <lazy-layout-social-btns />

      <v-divider />

      <div>
        {{ new Date().getFullYear() }} — <strong>AlvaSori</strong>
      </div>
    </v-footer>
  </v-app>
</template>
