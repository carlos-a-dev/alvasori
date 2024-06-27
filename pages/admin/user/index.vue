<script setup lang="ts">
const { showConfirmDialog } = useConfirmDialog()

async function deleteItem(id: number, name: string) {
  try {
    const confirm = await showConfirmDialog('Delete User', `Are you sure to delete "${name}"?`)
    if (confirm) {
      await $fetch(`/api/user/${id}`, { method: 'DELETE' })
    }
  }
  catch (error) { console.error(error) }
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Created At', key: 'createdAt', value: (user: Record<string, string>) => formatDate(user.createdAt) },
  { title: 'Updated At', key: 'updatedAt', value: (user: Record<string, string>) => formatDate(user.updatedAt) },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <container-grid title="Users">
    <template #append>
      <v-btn
        v-tooltip="'New User'"
        icon="mdi-plus"
        to="/admin/user/new"
      />
    </template>
    <as-grid
      api-endpoint="/api/user/grid"
      :headers="headers"
      :sort-by="[{ key: 'createdAt', order: 'asc' }]"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-btn
          class="text-info"
          size="xs"
          icon="mdi-pencil"
          :to="`/admin/user/${item.id}`"
        />
        <v-btn
          class="text-error"
          size="xs"
          icon="mdi-trash-can"
          @click="deleteItem(item.id, item.name)"
        />
      </template>
    </as-grid>
  </container-grid>
</template>
