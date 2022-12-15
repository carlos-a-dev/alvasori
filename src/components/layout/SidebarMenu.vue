<template>
  <q-list bordered dark>
    <q-item v-for="(item, key) in menuItems" v-bind:key="key" dark clickable v-ripple :to="item.link" exact>
        <q-item-section avatar>
          <q-avatar :icon="item.icon" />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  {
    label: 'Home',
    icon: 'mdi-home',
    link: '/',
    children: []
  },
  {
    label: 'Blocks',
    icon: 'mdi-code-tags',
    link: '/admin/block',
    children: []
  }
])
</script>

<style scoped>
.q-item.q-router-link--active, .q-item--active {
  color: var(--q-white);
  background-color: var(--q-secondary);
}
</style>
