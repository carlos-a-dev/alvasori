<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">Edit Block</q-toolbar-title>
      <q-btn
        flat round dense
        to="/admin/block"
        icon="mdi-cloud-check"
      />
    </q-toolbar>
    <BlockForm :block="block" @on-submit="save" v-if="loaded" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDocument, setDocument } from 'src/composables/firebase/use-firestore'
import BlockForm, { Block } from 'components/forms/BlockForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const { loading } = useQuasar()

// Data
const block = ref<Block>({
  code: '',
  description: 'This is as new block.',
  content: '<h1>Hello world!</h1>'
})
const loaded = ref<boolean>(false)

// Load the block
async function load () {
  loading.show()

  const data = await getDocument(route.params.id as string, 'blocks')
  if (data !== null) {
    block.value = data as Block
  }
  loaded.value = true

  loading.hide()
}

// Save the block
async function save (block: Block) {
  loading.show()
  await setDocument(block.code, 'blocks', block)
  loading.hide()
  router.push({ path: route.fullPath })
}

onMounted(load)
</script>
