<script setup lang="ts">
const id = parseInt(useRoute().params.id as string)

const { data } = await useFetch(`/api/page/${id}`, {
  pick: ['id', 'slug', 'description', 'content'],
})
if (data.value === null) {
  throw createError({ statusCode: 404 })
}

const page = data.value
</script>

<template>
  <container-form
    title="Edit Page"
    back="/admin/page"
  >
    <form-page :page="page" />
  </container-form>
</template>
