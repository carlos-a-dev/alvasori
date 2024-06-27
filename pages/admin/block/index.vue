<script setup lang="ts">
const { showConfirmDialog } = useConfirmDialog()

async function deleteItem(id: number, name: string) {
  try {
    const confirm = await showConfirmDialog('Delete Block', `Are you sure to delete "${name}"?`)
    if (confirm) {
      await $fetch(`/api/block/${id}`, { method: 'DELETE' })
    }
  }
  catch (error) { console.error(error) }
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Created At', key: 'createdAt', value: (block: Record<string, string>) => formatDate(block.createdAt) },
  { title: 'Updated At', key: 'updatedAt', value: (block: Record<string, string>) => formatDate(block.updatedAt) },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <container-grid title="Blocks">
    <template #append>
      <v-btn
        v-tooltip="'New Block'"
        icon="mdi-toy-brick-plus"
        to="/admin/block/new"
      />
    </template>
    <as-grid
      api-endpoint="/api/block/grid"
      :headers="headers"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-btn
          class="text-info"
          size="xs"
          icon="mdi-pencil"
          :to="`/admin/block/${item.id}`"
        />
        <v-btn
          class="text-error"
          size="xs"
          icon="mdi-toy-brick-remove"
          @click="deleteItem(item.id, item.name)"
        />
      </template>
    </as-grid>
  </container-grid>
</template>
