<script setup lang="ts">
import type { User } from '@prisma/client'

const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)
const showPassword = ref(false)

const user = reactive<Partial<User>>({})

async function onSubmit() {
  loading.value = true
  const newUser = await $fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  })
  loading.value = false
  navigateTo(`/admin/user/${newUser.id}`)
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
          href="/admin/user"
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
        New User
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

            <v-text-field
              v-model="user.password"
              label="Password"
              :rules="[vRequired]"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              @click:append-inner="showPassword = !showPassword"
            />
          </v-container>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
