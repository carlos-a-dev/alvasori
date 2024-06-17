<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

const loading = ref(false)
const form = ref<VForm | null>(null)

const id = useRoute().params.id as string

const { successAlert, errorAlert } = useAlerts()

const { data, error } = await useFetch(`/api/user/${id}`)

if (data.value === null || data.value === undefined) {
  navigateTo('/admin/user')
  errorAlert('Page not found!')
  throw createError({
    statusMessage: error.value?.message ?? 'User not found.',
    statusCode: error.value?.statusCode ?? 404,
  })
}
const user = reactive(data.value)

const repeatPassword = ref('')

async function onSubmit() {
  if (form.value === undefined || form.value === null) {
    return
  }

  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }

  loading.value = true
  await $fetch(`/api/user/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  })
  loading.value = false

  successAlert('Success!')

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
          validate-on="submit"
          @submit.prevent="onSubmit()"
        >
          <v-container
            fluid
            grid-list-xs
          >
            <v-text-field
              v-model="user.id"
              label="ID"
              :rules="[vRequired]"
              disabled
              required
            />

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

            <v-text-field
              v-model="user.password"
              label="Password"
              :rules="[(value) => !value || !!repeatPassword || 'Enter your new password again.']"
            />

            <v-text-field
              v-model="repeatPassword"
              label="Repeat Password"
              :rules="[(value) => user.password === undefined || (user.password.length === 0 && value.length === 0) || value === user.password || 'Password must match!']"
            />
          </v-container>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
