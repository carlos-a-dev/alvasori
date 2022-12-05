<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">New Block [ {{ block.id }} ]</q-toolbar-title>
      <q-btn
        flat rounded
        color="primary"
        title="Back"
        label="Back to list"
        to="/admin/block"
        icon="mdi-arrow-left"
      />
    </q-toolbar>
    <BlockForm @onSubmit="onSubmit" :block="block" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import BlockModel, { BlockInterface } from 'src/models/BlockModel'
import BlockForm from 'components/forms/BlockForm.vue'

const { loading } = useQuasar()

const block = ref<BlockModel>(BlockModel.create({
  id: '',
  enabled: true,
  description: '',
  content: ''
}))

async function onSubmit (newBlock: BlockInterface) {
  loading.show()
  // TODO: change for add method
  const id = await BlockModel.add(newBlock)
  block.value.id = id
  loading.hide()
}
</script>
