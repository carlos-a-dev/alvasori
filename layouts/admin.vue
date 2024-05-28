<script setup lang="ts">
const authStore = useAuthStore()

function onLogOutClick() {
  authStore.logUserOut()
  navigateTo('/admin/login')
}
</script>

<template>
  <v-app id="alvasori">
    <v-app-bar
      :elevation="1"
      rounded
    >
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title class="text-h4 font-weight-bold">
        <span class="text-red-accent-4">A</span>lva<span class="text-red-accent-4">S</span>ori
      </v-app-bar-title>

      <template #append>
        <v-btn
          icon="mdi-logout"
          title="Log Out"
          @click="onLogOutClick()"
        />
      </template>
    </v-app-bar>
    <v-main class="fill-height">
      <slot />
    </v-main>
  </v-app>
</template>
