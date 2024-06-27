<script setup lang="ts">
const { showConfirmDialog } = useConfirmDialog()

const asgrid = ref()
async function deleteItem(id: number, slug: string) {
  try {
    const confirm = await showConfirmDialog('Delete Page', `Are you sure to delete "${slug}"?`)
    if (confirm) {
      await $fetch(`/api/page/${id}`, { method: 'DELETE' })
      asgrid.value.loadItems()
    }
  }
  catch (error) { console.error(error) }
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Slug', key: 'slug' },
  { title: 'Description', key: 'description' },
  { title: 'Created At', key: 'createdAt', value: (page: Record<string, string>) => formatDate(page.createdAt) },
  { title: 'Updated At', key: 'updatedAt', value: (page: Record<string, string>) => formatDate(page.updatedAt) },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <container-grid title="Pages">
    <template #append>
      <v-btn
        v-tooltip="'New Page'"
        icon="mdi-plus"
        to="/admin/page/new"
      />
    </template>
    <as-grid
      ref="asgrid"
      api-endpoint="/api/page/grid"
      :headers="headers"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-btn
          class="text-info"
          size="xs"
          icon="mdi-pencil"
          :to="`/admin/page/${item.id}`"
        />
        <v-btn
          class="text-error"
          size="xs"
          icon="mdi-trash-can"
          @click="deleteItem(item.id, item.slug)"
        />
      </template>
    </as-grid>
  </container-grid>
</template>
