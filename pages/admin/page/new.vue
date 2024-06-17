<script setup lang="ts">
import type { Page } from '@prisma/client'

const { vRequired } = useValidation()

const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)

const page = reactive<Partial<Page>>({})

async function onSubmit() {
  loading.value = true
  const newPage = await $fetch('/api/page', {
    method: 'POST',
    body: JSON.stringify(page),
  })
  loading.value = false
  await navigateTo(`/admin/page/${newPage.id}`)
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
          to="/admin/page"
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
        New Page
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
              v-model="page.slug"
              label="Slug"
              :rules="[vRequired]"
              required
            />
            <v-text-field
              v-model="page.description"
              label="Description"
              required
            />

            <markdown-editor
              v-model="page.content"
              rounded
              label="Content"
              variant="outlined"
              :rules="[vRequired]"
            />
          </v-container>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
