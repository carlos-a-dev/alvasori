<script setup lang="ts">
import type { Block } from '@prisma/client'

const valid = ref(false)
const loading = ref(false)
const form = ref<HTMLFormElement | null>(null)

const block = reactive<Partial<Block>>({})

async function onSubmit() {
  loading.value = true
  const newBlock = await $fetch('/api/block', {
    method: 'POST',
    body: JSON.stringify(block),
  })
  loading.value = false
  await navigateTo(`/admin/block/${newBlock.name}`)
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
          to="/admin/block"
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
        New Block
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
              v-model="block.name"
              label="Name"
              :rules="[vRequired]"
              required
            />
            <v-text-field
              v-model="block.description"
              label="Description"
              required
            />

            <markdown-editor
              v-model="block.content"
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
