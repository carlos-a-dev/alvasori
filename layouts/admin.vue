<script setup lang="ts">
const user = useAuthenticatedUser()

const drawerOpen = ref(false)

async function logout() {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  })

  await navigateTo('/admin/login')
}
</script>

<template>
  <v-app id="alvasori">
    <v-layout>
      <v-app-bar
        :elevation="1"
        rounded
      >
        <template #prepend>
          <v-app-bar-nav-icon
            @click="drawerOpen = !drawerOpen"
          />
        </template>

        <v-app-bar-title class="text-h4 font-weight-bold">
          <app-name />
        </v-app-bar-title>

        <template #append>
          <span>{{ user.id }}</span>
          <v-btn
            icon="mdi-logout"
            title="Log Out"
            @click="logout()"
          />
        </template>
      </v-app-bar>

      <layout-admin-sidebar v-model="drawerOpen" />

      <v-main class="fill-height">
        <layout-app-alerts />
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
