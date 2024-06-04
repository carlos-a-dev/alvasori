<script setup lang="ts">
const { alerts, removeAlert } = useAlertStore()
</script>

<template>
  <v-expand-transition>
    <v-alert
      v-for="(alert, index) in alerts"
      :key="index"
      class="fade-transition"
      v-bind="alert"
      density="compact"
      tile
      closable
      @click:close="removeAlert(index)"
    />
  </v-expand-transition>
</template>
