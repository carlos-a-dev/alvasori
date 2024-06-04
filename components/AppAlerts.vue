<script setup lang="ts">
const { alerts, removeAlert } = useAlertStore()
</script>

<template>
  <div>
    <v-alert
      v-for="(alert, index) in alerts"
      :key="index"
      v-bind="alert"
      density="compact"
      tile
      closable
      @click:close="removeAlert(index)"
    />
  </div>
</template>
