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
import { useRoute } from 'vue-router'

const route = useRoute()
const { loading } = useQuasar()

// Data
const block = ref<BlockModel | undefined>()
const loaded = ref<boolean>(false)

// Load the block
async function load () {
  loading.show()
  const fetchedBlock = await BlockModel.get(route.params.id as string)
  if (fetchedBlock === null) {
    loading.hide()
    // TODO: redirect to 404 page
    return
  }

  block.value = fetchedBlock
  loaded.value = true
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
}

onMounted(load)
</script>
