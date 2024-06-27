<script setup lang="ts">
const props = defineProps<{
  apiEndpoint: string
}>()

type QParam = {
  skip?: number
  take?: number
  orderBy?: Record<string, 'asc' | 'desc'>
}

type DataTableOptions = {
  page: number
  itemsPerPage: number
  sortBy: Array<{ key: string, order: 'asc' | 'desc' }>
}

type GridData = {
  items: Record<string, unknown>[]
  count: number
}

const dataTableOptions = ref<DataTableOptions>()
const q = computed<QParam>(() => {
  if (dataTableOptions.value === undefined) {
    return {}
  }
  const query: QParam = {
    skip: (dataTableOptions.value.page - 1) * dataTableOptions.value.itemsPerPage,
    take: dataTableOptions.value.itemsPerPage,
  }
  if (dataTableOptions.value.sortBy.length > 0) {
    query.orderBy = {}
    dataTableOptions.value.sortBy.forEach((s) => {
      if (query.orderBy !== undefined) {
        query.orderBy[s.key] = s.order
      }
    })
  }

  return query
})

const loading = ref(false)
const data = ref<GridData>({
  count: 0,
  items: [],
})

async function loadItems() {
  loading.value = true
  try {
    data.value = await $fetch<GridData>(props.apiEndpoint, { params: { q: q.value } })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

watch(q, loadItems)
</script>

<template>
  <v-data-table-server
    v-bind="$attrs"
    v-model:options="dataTableOptions"
    :items="data.items"
    :loading="loading"
    :items-length="data.count"
  >
    <template
      v-for="(_slot, slotName) in $slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot
        :name="slotName"
        v-bind="slotProps ?? {}"
      />
    </template>
  </v-data-table-server>
</template>
