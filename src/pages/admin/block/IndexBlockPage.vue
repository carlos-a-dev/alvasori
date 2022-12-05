<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">Blocks</q-toolbar-title>
    </q-toolbar>

    <q-table
      :rows="blocks"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script setup lang="ts">
import BlockModel from 'src/models/BlockModel'
import { ref } from 'vue'

const blocks = ref([
  BlockModel.create({ id: 'ABCDEF123', name: 'test-1', enabled: true, description: 'test 1', content: '<p>This is a test</p>' })
])

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'enabled', label: 'Enabled', field: 'enabled', sortable: true },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'description', label: 'Description', field: 'description', sortable: true }
]

</script>
