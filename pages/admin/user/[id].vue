<script setup lang="ts">
const id = useRoute().params.id as string

const { data } = await useFetch(`/api/user/${id}`, {
  pick: ['id', 'name', 'email', 'username'],
})
if (data.value === null) {
  throw createError({ statusCode: 404 })
}

const user = data.value
</script>

<template>
  <container-form
    title="Edit User"
    back="/admin/user"
  >
    <form-user :user="user" />
  </container-form>
</template>
