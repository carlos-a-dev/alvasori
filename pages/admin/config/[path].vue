<script setup lang="ts">
const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)

const path = useRoute().params.path

const { successAlert, errorAlert } = useAlerts()

const { data, error } = await useAsyncData(`config/${path}`, () => $fetch(`/api/config/${path}`))

if (data.value === null || data.value === undefined) {
  navigateTo('/admin')
  throw createError({
    statusMessage: error.value?.message ?? 'Config not found.',
    statusCode: error.value?.statusCode ?? 404,
  })
}
const config = reactive(data.value)

async function onSubmit() {
  loading.value = true
  try {
    await $fetch(`/api/config/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        path: config.path,
        value: config.value,
      }),
    })
    successAlert('Success!')
  }
  catch (err) {
    if (err instanceof Error) {
      errorAlert(err.message ?? 'Something went wrong!')
    }
    console.error(err)
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
        <v-icon icon="mdi-cog" />
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
        Edit Config
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
            <component
              :is="resolveComponent(config.component)"
              v-model="config.value"
            />
          </v-container>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
