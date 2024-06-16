<script setup lang="ts">
const configAppName = await useConfigStore().getConfigValue('app-name', 'AppName')
</script>

<template>
  <a-markdown
    :value="configAppName"
    unwrap="p"
    tag="span"
  />
</template>
