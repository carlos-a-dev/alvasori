<template>
  <q-page padding>
    <BlockForm :block="block" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BlockForm, { Block } from 'components/forms/BlockForm.vue'

const block = ref<Block>({
  code: '',
  description: 'This is as new block.',
  content: '<h1>Hello world!</h1>'
})

</script>
