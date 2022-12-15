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
      :loading="tableLoading"
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
              text-color="info"
              size="sm"
              title="Edit"
              dense
            />
            <q-btn
              @click="deleteBlock(props.row.id)"
              icon="mdi-trash-can"
              text-color="negative"
              size="sm"
              title="Delete"
              dense
            />
          </q-btn-group>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QTable, useQuasar } from 'quasar'
import { limit, orderBy, OrderByDirection } from '@firebase/firestore'
import BlockModel from 'src/models/BlockModel'

const { loading, dialog } = useQuasar()

const blocks = ref<BlockModel[]>([])

const tableLoading = ref<boolean>(false)
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

  return await BlockModel.getAll(constraints)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onRequest (props: any) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  tableLoading.value = true

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
  tableLoading.value = false
}

function deleteBlock (blockId: string) {
  dialog({
    title: 'Are you sure you want to delete this block?',
    message: 'This action is irreversible.'
  }).onOk(async () => {
    loading.show()
    await BlockModel.delete(blockId)
    loading.hide()
    tableRef.value?.requestServerInteraction()
  })
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value?.requestServerInteraction()
})
</script>
