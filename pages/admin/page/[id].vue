<script setup lang="ts">
const { successAlert, errorAlert } = useAlerts()
const { vRequired } = useValidation()

const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)
const route = useRoute()
const pageId = parseInt(route.params.id as string)

const { data, error } = await useAsyncData(`page-edit`, () => $fetch(`/api/page/${pageId}`))

if (data.value === null || data.value === undefined) {
  navigateTo('/admin/page')
  errorAlert('Page not found!')
  throw createError({
    statusMessage: error.value?.message ?? 'Page not found.',
    statusCode: error.value?.statusCode ?? 404,
  })
}

const page = reactive(data.value)

async function onSubmit() {
  loading.value = true
  await $fetch(`/api/page/${pageId}`, {
    method: 'PUT',
    body: JSON.stringify(page),
  })
  loading.value = false
  successAlert('Success!', { time: 2000 })
  await navigateTo('/admin/page')
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
        Edit Page
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
