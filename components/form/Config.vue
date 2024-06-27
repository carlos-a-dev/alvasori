<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { InternalApi } from 'nitropack'

const { successAlert, errorAlert } = useAlerts()

const props = defineProps<{
  config: InternalApi['/api/config/:path']['get']
}>()

if (props.config === undefined) {
  throw createError({
    statusCode: 500,
  })
}

const payload = ref({ ...props.config })
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
    refreshNuxtData()
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

function onReset() {
  payload.value = { ...props.config }
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent="onSubmit()"
    @reset.prevent="onReset()"
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
      <v-btn-group
        rounded="pill"
        density="comfortable"
      >
        <v-btn
          :disabled="!form?.isValid"
          :loading="loading"
          prepend-icon="mdi-content-save"
          text="Save"
          type="submit"
          color="primary"
        />
        <v-btn
          :disabled="!form?.isValid"
          :loading="loading"
          prepend-icon="mdi-restart"
          text="Reset"
          color="secondary"
          @click="onReset()"
        />
      </v-btn-group>
    </v-container>
  </v-form>
</template>
