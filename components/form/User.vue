<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { User } from '@prisma/client'

const { successAlert, errorAlert } = useAlerts()
const { vRequired, vEmail } = useValidation()

const props = withDefaults(defineProps<{
  user?: Partial<User>
}>(), {
  user: () => ({
    name: '',
    email: '',
    username: '',
  }),
})

const repeatPassword = ref('')
const payload = ref(props.user)
const loading = ref(false)
const form = ref<VForm>()

async function onSubmit() {
  if (!(await form.value?.validate())?.valid) {
    return
  }

  try {
    loading.value = true
    if (payload.value.id) {
      await $fetch(`/api/user/${payload.value.id}`, {
        method: 'PUT',
        body: payload.value,
      })
    }
    else {
      await $fetch('/api/user', {
        method: 'POST',
        body: payload.value,
      })
    }
    successAlert('User saved!')
    await navigateTo('/admin/user')
  }
  catch (error) {
    console.error(error)
    errorAlert('The user was not saved!')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent="onSubmit"
  >
    <v-container
      grid-list-xs
      class="px-0 px-md-4"
    >
      <v-text-field
        v-model="payload.id"
        label="ID"
        disabled
      />

      <v-text-field
        v-model="payload.name"
        label="Name"
        :rules="[vRequired]"
        required
      />
      <v-text-field
        v-model="payload.email"
        label="E-mail"
        :rules="[vRequired, vEmail]"
        required
      />
      <v-text-field
        v-model="payload.username"
        label="Username"
        :rules="[vRequired]"
        required
      />

      <v-text-field
        v-model="payload.password"
        label="Password"
        :rules="[(value: string) => !value || !!repeatPassword || 'Enter your new password again.']"
      />

      <v-text-field
        v-model="repeatPassword"
        label="Repeat Password"
        :rules="[(value: string) => user.password === undefined || (user.password.length === 0 && value.length === 0) || value === user.password || 'Password must match!']"
      />

      <v-btn
        :disabled="!form?.isValid"
        :loading="loading"
        prepend-icon="mdi-content-save"
        text="Save"
        type="submit"
        color="primary"
      />
    </v-container>
  </v-form>
</template>
