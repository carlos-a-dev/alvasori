<template>
  <router-view />
</template>

<script lang="ts">
import { useConfigStore } from 'src/stores/config'
import { useDynamicTheme } from 'src/composables/use-dynamic-theme'

export default {
  preFetch: async ({ store }) => {
    const { loadRemoteConfig } = useConfigStore(store)
    useDynamicTheme()
    await loadRemoteConfig()
  }
}
</script>
