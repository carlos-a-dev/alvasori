<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'login',
})

const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)

const valid = ref(false)
const username = ref('')
const password = ref('')

async function onSubmit() {
  await authStore.authenticateUser({
    username: username.value,
    password: password.value,
  })

  if (authenticated.value) {
    navigateTo('/admin')
    window.alert('Access')
  }
  else {
    window.alert('Wrong password')
  }
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
          Log In
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-form>
  </v-card>
</template>
