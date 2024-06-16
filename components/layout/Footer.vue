<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-footer
      app
      class="text-red-darken-3 d-flex flex-column"
      absolute
    >
      <lazy-layout-social-btns />

      <v-divider />

      <div>
        {{ new Date().getFullYear() }} — <strong><app-name /></strong>
      </div>
    </v-footer>
  </div>
</template>
