<script setup lang="ts">
setPageLayout('login')

const form = ref<HTMLFormElement | null>(null)
const usernameInput = ref<HTMLInputElement | null>(null)
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const { errorAlert } = useAlerts()

const payload = reactive({
  username: '',
  password: '',
})

async function onSubmit() {
  loading.value = true
  const result = await useFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  loading.value = false

  if (result.error.value) {
    errorAlert(result.error.value.data?.message || 'There is an error with your request.')

    form.value?.reset()
    usernameInput.value?.focus()
    return
  }

  await navigateTo('/admin')
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
        </v-container>
      </v-form>
    </template>
  </v-card>
</template>
