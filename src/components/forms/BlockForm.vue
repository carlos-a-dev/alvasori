<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">
        New Block
      </div>
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          name="code"
          v-model="block.code"
          label="Block Code *"
          hint="A unique block name to identify it."
          outlined
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          dense
        />

        <q-input
          name="description"
          v-model="block.description"
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
import { useQuasar } from 'quasar'
import HtmlInput from 'components/forms/inputs/HtmlInput.vue'

export interface Block {
  id?: string,
  code: string,
  description: string,
  content: string
}

interface Props {
  block: Block
}

const $q = useQuasar()

const props = withDefaults(defineProps<Props>(), {
  block: () => ({
    code: '',
    description: '',
    content: ''
  })
})

const block = ref(props.block)

function onSubmit () {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}

function onReset () {
  block.value.code = props.block.code
  block.value.description = props.block.description
  block.value.content = props.block.content
}

</script>
