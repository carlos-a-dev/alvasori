<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { Config } from '@prisma/client'

const { successAlert, errorAlert } = useAlerts()

const props = defineProps<{
  config: Partial<Config>
}>()

if (props.config === undefined) {
  throw createError({
    statusCode: 500,
  })
}

const payload = ref(props.config)
const loading = ref(false)
const form = ref<VForm>()

async function onSubmit() {
  loading.value = true
  try {
    await $fetch(`/api/config/${payload.value.path}`, {
      method: 'PUT',
      body: {
        value: payload.value.value,
      },
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
  <v-form
    ref="form"
    @submit.prevent="onSubmit()"
  >
    <v-container
      class="px-0"
      fluid
      grid-list-xs
    >
      <component
        :is="resolveComponent(payload.component ?? 'VTextField')"
        v-model="payload.value"
      />
      <v-btn
        :disabled="!form?.isValid"
        :loading="loading"
        prepend-icon="mdi-content-save"
        text="Save"
        type="submit"
        color="primary"
      />
    </v-container>
  </v-form>
</template>
