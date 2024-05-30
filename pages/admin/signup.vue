<script setup lang="ts">
setPageLayout('login')

const valid = ref(false)
const username = ref('')
const password = ref('')
const email = ref('')

async function onSubmit() {
  const result = await useFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
    }),
  })

  if (result.error.value) {
    window.alert('error: ' + JSON.stringify(result))
    return false
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
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="email"
                label="email"
                variant="solo"
                :rules="[vRequired, v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="username"
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
                v-model="password"
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
