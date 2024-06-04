<script setup lang="ts">
const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)

const userId = useRoute().params.userId

const { data, error } = await useAsyncData(`user/${userId}`, () => $fetch(`/api/user/${userId}`))

if (data.value === null || data.value === undefined) {
  navigateTo('/admin/user')
  throw createError({
    statusMessage: error.value?.message ?? 'User not found.',
    statusCode: error.value?.statusCode ?? 404,
  })
}
const user = reactive(data.value)

async function onSubmit() {
  loading.value = true
  await $fetch(`/api/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  })
  loading.value = false
  navigateTo('/admin/user')
}
</script>

<template>
  <v-container>
    <v-card
      flat
      :loading="loading"
    >
      <template #prepend>
        <v-btn
          v-tooltip="'Back'"
          flat
          icon="mdi-arrow-left"
          to="/admin/user"
        />
      </template>
      <template #append>
        <v-btn
          v-tooltip="'Save'"
          variant="flat"
          icon="mdi-content-save"
          :disabled="!valid"
          :loading="loading"
          @click="onSubmit()"
        />
      </template>

      <template #title>
        Edit User
      </template>

      <template #text>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="onSubmit()"
        >
          <v-container
            fluid
            grid-list-xs
          >
            <v-text-field
              v-model="user.name"
              label="Name"
              :rules="[vRequired]"
              required
            />
            <v-text-field
              v-model="user.email"
              label="E-mail"
              :rules="[vRequired, vEmail]"
              required
            />
            <v-text-field
              v-model="user.username"
              label="Username"
              :rules="[vRequired]"
              required
            />
          </v-container>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
