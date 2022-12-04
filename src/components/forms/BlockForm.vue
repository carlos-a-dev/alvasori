<template>
  <q-card flat>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >

        <q-toggle
            name="enabled"
            v-model="block.enabled"
            label="Enabled"
        />

        <q-input
          name="name"
          v-model="block.name"
          label="Name"
          hint="Must be unique"
          outlined
          required
          :autofocus="!editMode"
          :readonly="editMode"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          dense
        />

        <q-input
          name="description"
          v-model="block.description"
          :autofocus="editMode"
          type="textarea"
          label="Description"
          hint="Optional"
          outlined
          dense
        />

        <HtmlInput
          name="content"
          v-model="block.content"
          label="Content"
          outlined
          :rules="[ (val:string) => val && val.length > 0 || 'Please type something']"
          dense
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HtmlInput from 'components/forms/inputs/HtmlInput.vue'
import { BlockInterface } from 'src/models/BlockModel'

interface Props {
  block: BlockInterface,
  editMode?: boolean
}

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'onSubmit', block: BlockInterface): void
 }>()

const props = withDefaults(defineProps<Props>(), {
  block: () => ({
    id: '',
    enabled: true,
    name: '',
    description: '',
    content: ''
  }),
  editMode: false
})

const block = ref<BlockInterface>({ ...props.block })

function onSubmit () {
  emit('onSubmit', block.value)
}

function onReset () {
  block.value = { ...props.block }
}

</script>
