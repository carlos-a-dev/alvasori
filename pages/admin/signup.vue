<script setup lang="ts">
setPageLayout('login')

const { vRequired, vEmail } = useValidation()

const valid = ref(false)
const alert = reactive<{
  show: boolean
  type?: 'info' | 'error' | 'success' | 'warning'
  message: string
}>({
  show: false,
  type: 'info',
  message: '',
})

const payload = reactive({
  username: '',
  password: '',
  email: '',
})

async function onSubmit() {
  const result = await useFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (result.error.value) {
    alert.type = 'error'
    alert.message = result.error.value.data?.message || 'There is an error with your request.'
    alert.show = true
    return
  }

  await navigateTo('/admin')
}
</script>

<template>
  <v-card width="450px">
    <v-card-title
      primary-title
      class="bg-primary-darken-1"
    >
      <div>
        <h3 class="headline mb-0">
          AlvaSori
        </h3>
        <div>Login</div>
      </div>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="onSubmit"
    >
      <v-card-text class="bg-primary-lighten-1">
        <v-alert
          v-model="alert.show"
          :type="alert.type"
          closable
          :text="alert.message"
        />
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="payload.email"
                label="email"
                variant="solo"
                :rules="[vRequired, vEmail]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="payload.username"
                label="Username"
                variant="solo"
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
                type="password"
                variant="solo"
                :rules="[vRequired]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          flat
          rounded
          color="primary"
          type="submit"
          :disabled="!valid"
        >
          Sign Up
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-form>
  </v-card>
</template>
