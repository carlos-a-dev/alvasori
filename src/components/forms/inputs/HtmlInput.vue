<template>
  <q-field v-model="value">
    <template v-slot:control>
      <div class="self-center full-width q-pa-sm">
        <q-toggle
          dense
          class="absolute-top-right q-pa-sm"
          label="Preview"
          left-label
          v-model="preview"
          color="green"
        />
        <div class="row">
          <div class="col q-pa-sm">
            <Codemirror
              :style="{ height: '400px' }"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              v-model="value"
            />
          </div>
          <q-separator vertical v-if="preview" />
          <div class="col q-pa-sm" v-if="preview">
            <div v-html="value"></div>
          </div>
        </div>
      </div>
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { Extension } from '@codemirror/state'

const props = defineProps<{
  modelValue: string
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const preview = ref<boolean>(true)
const extensions = ref<Extension>()

async function loadLanguage () {
  const { html } = await import('@codemirror/lang-html')
  extensions.value = [html()]
}

loadLanguage()
</script>
