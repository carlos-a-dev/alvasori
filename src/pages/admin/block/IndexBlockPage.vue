<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="text-h4">Blocks</q-toolbar-title>
      <q-btn
        flat dense
        color="primary"
        title="New Block"
        label="New Block"
        to="/admin/block/new"
        icon="mdi-plus"
      />
    </q-toolbar>

    <q-table
      ref="tableRef"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
      :rows="blocks"
      :columns="(columns as any)"
      row-key="id"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:body-cell-enabled="props">
        <q-td :props="props">
          <q-toggle :model-value="props.row.enabled" dense disable />
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn-group flat rounded>
            <q-btn
              :to="{ path: '/admin/block/edit/' + props.row.id }"
              icon="mdi-pencil"
              size="sm"
              title="Edit"
              dense
            />
          </q-btn-group>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { limit, orderBy, OrderByDirection } from '@firebase/firestore'
import { QTable } from 'quasar'
import BlockModel from 'src/models/BlockModel'
import { onMounted, ref } from 'vue'

const blocks = ref<BlockModel[]>([])

const loading = ref<boolean>(false)
const pagination = ref({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10
})

const tableRef = ref()

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: false },
  { name: 'enabled', label: 'Enabled', field: 'enabled', sortable: true },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'description', label: 'Description', field: 'description', sortable: true },
  { name: 'action', label: 'Action', field: 'id', sortable: false }
]

async function loadBlocks (rowsPerPage = 5, orderByColumn = 'name', direction:OrderByDirection = 'asc') {
  const constraints = []
  constraints.push(limit(rowsPerPage))
  if (orderByColumn) {
    constraints.push(orderBy(orderByColumn, direction))
  }
  console.log(constraints)

  return await BlockModel.getAll(constraints)
}

async function onRequest (props:any) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  // get all rows if "All" (0) is selected
  const fetchCount = rowsPerPage

  // fetch data from "server"
  const returnedData = await loadBlocks(fetchCount, sortBy, descending ? 'desc' : 'asc')
  // console.log(returnedData, props.pagination)

  // update rowsCount with appropriate value
  pagination.value.rowsNumber = returnedData.length

  // clear out existing data and add new
  blocks.value = returnedData

  // don't forget to update local pagination object
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending

  // ...and turn of loading indicator
  loading.value = false
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value?.requestServerInteraction()
})
</script>
