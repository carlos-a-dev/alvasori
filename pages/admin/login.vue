<script setup lang="ts">
import { FetchError } from 'ofetch'

setPageLayout('login')

const { errorAlert } = useAlerts()
const { vRequired } = useValidation()
const { executeRecaptcha } = useGoogleRecaptcha()

const form = ref<HTMLFormElement | null>(null)
const usernameInput = ref<HTMLInputElement | null>(null)
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const payload = reactive({
  username: '',
  password: '',
})

async function onSubmit() {
  loading.value = true
  try {
    const data = await executeRecaptcha('login')
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        'g-recaptcha-response': data.token,
      }),
    })

    await navigateTo('/admin')
  }
  catch (error) {
    console.error(error)
    if (error instanceof FetchError) {
      errorAlert(error.statusMessage || 'There is an error with your request.')
    }

    form.value?.reset()
    usernameInput.value?.focus()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <v-card
    width="450px"
    :loading="loading"
    elevation="20"
  >
    <template #title>
      AlvaSori
    </template>
    <template #subtitle>
      Login
    </template>

    <template #text>
      <layout-app-alerts />
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onSubmit"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                ref="usernameInput"
                v-model="payload.username"
                autofocus
                label="Username"
                :rules="[vRequired]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="payload.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[vRequired]"
                @click:append-inner="showPassword = !showPassword"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="!valid"
                :loading="loading"
              >
                Log In
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p class="text-center">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </v-card>
</template>
