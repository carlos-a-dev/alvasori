<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">New Block</q-toolbar-title>
      <q-btn
        flat rounded
        color="primary"
        title="Back"
        label="Back to list"
        to="/admin/block"
        icon="mdi-arrow-left"
      />
    </q-toolbar>
    <BlockForm @onSubmit="save" :block="block" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import BlockModel from 'src/models/BlockModel'
import BlockForm from 'components/forms/BlockForm.vue'

const router = useRouter()
const { loading, notify } = useQuasar()

const block = ref<BlockModel>(BlockModel.create({
  id: '',
  enabled: true,
  description: '',
  content: ''
}))

// Save the block
async function save (newBlock: BlockModel) {
  loading.show()
  const blockId = await BlockModel.add(newBlock)
  if (blockId !== null) {
    block.value.id = blockId
  }
  loading.hide()

  notify({
    type: 'positive',
    message: 'Block created!',
    position: 'top'
  })

  router.push('/admin/block')
}
</script>
