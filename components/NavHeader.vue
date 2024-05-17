<template>
  <v-app-bar flat>
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
        v-for="link in links"
        :key="link.to"
        :text="link.label"
        :to="link.to"
        variant="text"
      />

      <v-spacer />

      <v-responsive max-width="160">
        <v-text-field
          density="compact"
          label="Search"
          rounded="lg"
          variant="solo-filled"
          flat
          hide-details
          single-line
        />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
]
</script>
