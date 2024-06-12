<script setup lang="ts">
import 'md-editor-v3/lib/style.css'
import { MdEditor, NormalToolbar, allToolbar, type ToolbarNames } from 'md-editor-v3'
import markdownParser from '@nuxt/content/transformers/markdown'

const value = defineModel<string>()
const enablePreview = ref(true)
const preview = ref<Record<string, unknown>>({ body: { type: 'root', children: [] } })

watch([value, enablePreview], async ([newValue, newEnablePreview]) => {
  if (newEnablePreview && markdownParser.parse !== undefined) {
    preview.value = await markdownParser.parse('preview.md', newValue ?? '', {})
  }
}, { immediate: true })
</script>

<template>
  <v-input
    v-model="value"
    class="markdown-editor-input"
  >
    <template #default="{ isDirty, isValid, isPristine }">
      <v-field
        v-bind="$attrs"
        v-model="value"
        :active="value !== undefined && value?.length > 0"
        :dirty="isDirty.value"
        :error="!isPristine.value && !isValid.value"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
              :sm="enablePreview ? '6' : '12'"
            >
              <MdEditor
                v-model="value"
                :preview="false"
                language="en-US"
                :toolbars="[...(allToolbar as ToolbarNames[]), 0]"
                :toolbars-exclude="['preview', 'fullscreen', 'mermaid', 'htmlPreview', 'pageFullscreen', 'save', 'previewOnly', 'catalog', 'github', 'katex']"
                :footers="['markdownTotal']"
                no-mermaid
                no-katex
                no-upload-img
              >
                <template #defToolbars>
                  <NormalToolbar
                    :title="enablePreview ? 'Hide Preview' : 'Show Preview'"
                    @on-click="enablePreview = !enablePreview"
                  >
                    <template #trigger>
                      <v-icon>{{ enablePreview ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </template>
                  </NormalToolbar>
                </template>
              </MdEditor>
            </v-col>
            <v-col
              v-if="enablePreview"
              cols="12"
              sm="6"
            >
              <v-container class="border-thin fill-height align-start px-5 overflow-auto">
                <ContentRenderer :value="preview">
                  <ContentRendererMarkdown
                    :value="preview"
                    class="w-100"
                  />
                </ContentRenderer>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-field>
    </template>
  </v-input>
</template>

<style>
.markdown-editor-input .v-field--center-affix .v-label.v-field-label {
  left: 18px;
  top: 80px;
  transform: translateY(-50%);
}
</style>
