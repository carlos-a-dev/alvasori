<script lang="ts" setup>
import type { VListItem } from 'vuetify/components'

type ListItem = VListItem['$props']

const isOpen = defineModel({
  default: true,
  type: Boolean,
})

const items: ListItem[] = [
  {
    title: 'Home',
    to: '/admin',
    prependIcon: 'mdi-home',
  },
  {
    title: 'Users',
    to: '/admin/user',
    prependIcon: 'mdi-head',
  },
  {
    title: 'Blocks',
    to: '/admin/block',
    prependIcon: 'mdi-toy-brick',
  },
]
</script>

<template>
  <v-navigation-drawer v-model="isOpen">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>
