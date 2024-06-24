<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { Block } from '@prisma/client'

const { successAlert, errorAlert } = useAlerts()
const { vRequired } = useValidation()

const props = withDefaults(defineProps<{
  block?: Partial<Block>
}>(), {
  block: () => ({
    name: '',
    description: '',
    content: '',
  }),
})

const payload = ref(props.block)
const loading = ref(false)
const form = ref<VForm>()

async function onSubmit() {
  if (!(await form.value?.validate())?.valid) {
    return
  }

  try {
    loading.value = true
    if (payload.value.id) {
      await $fetch(`/api/block/${payload.value.id}`, {
        method: 'PUT',
        body: payload.value,
      })
    }
    else {
      await $fetch('/api/block', {
        method: 'POST',
        body: payload.value,
      })
    }
    successAlert('Block saved!')
    await navigateTo('/admin/block')
  }
  catch (error) {
    console.error(error)
    errorAlert('The block was not saved!')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent="onSubmit"
  >
    <v-container
      grid-list-xs
      class="px-0 px-md-4"
    >
      <v-text-field
        v-model="payload.name"
        label="Name"
        :rules="[vRequired]"
        required
      />
      <v-text-field
        v-model="payload.description"
        label="Description"
        required
      />

      <markdown-editor
        v-model="payload.content"
        rounded
        label="Content"
        variant="outlined"
        :rules="[vRequired]"
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
