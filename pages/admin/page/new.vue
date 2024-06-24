<script setup lang="ts">
import type { Page } from '@prisma/client'
import { VForm } from 'vuetify/components'

const { vRequired } = useValidation()
const { successAlert, errorAlert } = useAlerts()

const loading = ref(false)
const form = ref<VForm>()

const page = reactive<Partial<Page>>({})

async function onSubmit() {
  loading.value = true
  try {
    await $fetch('/api/page', {
      method: 'POST',
      body: page,
    })
    successAlert('Page saved!')
    await navigateTo('/admin/page')
  }
  catch (error) {
    console.error(error)
    errorAlert('The page was not saved!')
  }
  finally {
    loading.value = false
  }
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
          :disabled="!form?.isValid"
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
