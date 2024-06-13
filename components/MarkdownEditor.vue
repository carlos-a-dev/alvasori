<script setup lang="ts">
import 'md-editor-v3/lib/style.css'
import { MdEditor, NormalToolbar, allToolbar, type ToolbarNames } from 'md-editor-v3'

const value = defineModel<string>()
const enablePreview = ref(true)
</script>

<template>
  <v-input
    v-model="value"
    class="markdown-editor-input"
  >
    <template #default="{ id, isDirty, isValid, isPristine }">
      <v-field
        v-bind="$attrs"
        v-model="value"
        :active="value !== undefined && value?.length > 0"
        :dirty="isDirty.value"
        :error="!isPristine.value && !isValid.value"
        :id="id.value"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
              :sm="enablePreview ? '6' : '12'"
            >
            <input type="hidden" :value="value" :id="id.value" class="redox">
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
                <a-markdown :value="value" class="w-100" />
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
