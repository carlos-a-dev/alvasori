<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">Edit Block</q-toolbar-title>
      <q-btn
        flat rounded
        color="primary"
        title="Back"
        label="Back to list"
        to="/admin/block"
        icon="mdi-arrow-left"
      />
    </q-toolbar>
    <BlockForm :edit-mode="true" :block="block" @on-submit="save" v-if="loaded" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import BlockForm from 'components/forms/BlockForm.vue'
import BlockModel from 'src/models/BlockModel'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { loading, notify } = useQuasar()

// Data
const block = ref<BlockModel | undefined>()
const loaded = ref<boolean>(false)

// Load the block
async function load () {
  loading.show()

  block.value = await BlockModel.get(route.params.id as string) ?? undefined
  if (block.value === null) {
    router.push('/404')
  } else {
    loaded.value = true
  }

  loading.hide()
}

// Save the block
async function save (editedBlock: BlockModel) {
  loading.show()
  const res = await BlockModel.set(editedBlock.id as string, editedBlock)
  if (res !== null) {
    block.value = res
  }
  loading.hide()

  notify({
    type: 'positive',
    message: 'Block updated!',
    position: 'top'
  })

  router.push('/admin/block')
}

onMounted(load)
</script>
