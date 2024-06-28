<script setup lang="ts">
type SocialNetworks = Array<{ icon: string, link: string }>

const props = defineProps<{ socialNetworks?: SocialNetworks }>()

const { data: config } = await useAsyncData<SocialNetworks>('social-networks', () => useConfigStore().getConfigValue('social-networks', []))

const networks = computed((): SocialNetworks => {
  if (props.socialNetworks !== undefined) {
    return props.socialNetworks
  }

  return config.value ?? [] as SocialNetworks
})
</script>

<template>
  <v-btn-group class="text-red-darken-3">
    <v-btn
      v-for="(network, index) in networks"
      :key="index"
      :icon="network.icon"
      :href="network.link"
      class="mx-4"
      variant="text"
    />
  </v-btn-group>
</template>
