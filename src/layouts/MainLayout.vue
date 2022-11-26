<template>
  <q-layout view="hhh lpR fff">

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img :src="logoSrc">
          </q-avatar>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" class="bg-primary" overlay>
      <!-- drawer content -->
      <div><span>Carlos</span></div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white">
      <q-toolbar dense>
        <q-toolbar-title>
          {{ author }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const title = computed(() => process.env.APP_NAME)
const logoSrc = computed(() => process.env.APP_LOGO)
const author = computed(() => 'Carlos Alvarez')

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
