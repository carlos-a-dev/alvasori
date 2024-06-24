<script setup lang="ts">
const id = parseInt(useRoute().params.id as string)
const { data } = await useFetch(`/api/block/${id}`, {
  pick: ['id', 'name', 'description', 'content'],
})
if (data.value === null) {
  throw createError({ statusCode: 404 })
}

const block = data.value
</script>

<template>
  <container-form
    title="Edit Block"
    back="/admin/block"
  >
    <form-block
      :block="block"
    />
  </container-form>
</template>
