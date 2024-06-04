<script setup lang="ts">
const user = useAuthenticatedUser()

const drawerOpen = ref(false)

async function logout() {
  await useFetch('/api/auth/logout', {
    method: 'POST',
  })

  await navigateTo('/admin/login')
}
</script>

<template>
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
        <span class="text-red-accent-4">A</span>lva<span class="text-red-accent-4">S</span>ori
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

    <v-navigation-drawer v-model="drawerOpen">
      <v-list>
        <v-list-item title="Navigation drawer" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="fill-height">
      <app-alerts />
      <slot />
    </v-main>
  </v-layout>
</template>
