<script setup lang="ts">
const path = useRoute().params.path

const { data } = await useFetch(`/api/config/${path}`, {
  pick: ['path', 'description', 'component', 'value'],
})

if (data.value === null) {
  throw createError({ statusCode: 404 })
}

const config = data.value
</script>

<template>
  <container-form
    :title="`Edit Config: ${config.path}`"
    :subtitle="config.description ?? undefined"
  >
    <form-config :config="config" />
  </container-form>
</template>
