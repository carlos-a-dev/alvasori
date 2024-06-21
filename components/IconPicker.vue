<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { searchIcons } = useIconList()

const search = ref('')
const iconList = computed<string[]>(() => {
  return searchIcons(search.value, 24)
})

const { lgAndUp, smAndDown } = useDisplay()
const cols = computed(() => {
  return lgAndUp.value
    ? 2
    : smAndDown.value ? 4 : 3
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="search" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="icon in iconList"
        :key="icon"
        :cols="cols"
        class="d-flex flex-column align-center"
      >
        <v-icon
          :icon="`mdi-${icon}`"
          size="xxx-large"
        />
        <span>mdi-{{ icon }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>
