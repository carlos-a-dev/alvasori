<template>
  <q-page padding>
    <BlockForm :block="block" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { doc, getDoc, getDocument, getFs } from 'src/composables/firebase/use-firestore'
import BlockForm, { Block } from 'components/forms/BlockForm.vue'

const block = ref<Block>({
  code: '',
  description: 'This is as new block.',
  content: '<h1>Hello world!</h1>'
})

export default defineComponent({
  components: {
    BlockForm
  },
  setup () {
    return { block }
  },
  async preFetch ({ currentRoute }) {
    const data = await getDocument(currentRoute.params.id as string, 'blocks')
    if (data !== null) {
      block.value = data as Block
    }
  }
})
</script>
