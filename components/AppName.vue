<script setup lang="ts">
const { data: configAppName } = await useAsyncData('appName', () => useConfigStore().getConfigValue('app-name', 'AppName'))
</script>

<template>
  <a-markdown
    :value="configAppName"
    unwrap="p"
    tag="span"
  />
</template>
