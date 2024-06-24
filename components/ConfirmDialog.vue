<script setup lang="ts">
const props = defineProps({
  title: String,
  message: String,
  onConfirm: Function,
  onCancel: Function,
})

const visible = shallowRef(true)
const optionSelected = shallowRef(false)

const confirm = () => {
  visible.value = false
  optionSelected.value = true
  props.onConfirm && props.onConfirm()
}

const cancel = () => {
  visible.value = false
  optionSelected.value = true
  props.onCancel && props.onCancel()
}
</script>

<template>
  <v-dialog
    v-model="visible"
    max-width="400"
    @after-leave="optionSelected ? null : cancel()"
  >
    <v-card rounded="lg">
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="confirm"
        >
          OK
        </v-btn>
        <v-btn
          color="secondary"
          @click="cancel"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
