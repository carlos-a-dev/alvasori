<script setup lang="ts">
const { showConfirmDialog } = useConfirmDialog()

const { data: blocks, refresh, status } = await useFetch('/api/block')

async function deleteBlock(id: number) {
  try {
    const block = blocks.value?.find(block => block.id === id)
    const confirm = await showConfirmDialog('Delete Block', `Are you sure to delete "${block?.name ?? id}"?`)
    if (confirm) {
      await $fetch(`/api/block/${id}`, { method: 'DELETE' })
      refresh()
    }
  }
  catch (error) { console.error(error) }
}
</script>

<template>
  <v-container>
    <v-card
      title="Blocks"
      :loading="status === 'pending'"
    >
      <template #title>
        Blocks
      </template>

      <template #append>
        <v-btn
          v-tooltip="'New block'"
          icon="mdi-toy-brick-plus"
          variant="flat"
          to="/admin/block/new"
        />
      </template>

      <template #text>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="blocks && blocks.length > 0">
            <tr
              v-for="block in blocks"
              :key="block.id"
            >
              <td>{{ block.id }}</td>
              <td>{{ block.name }}</td>
              <td>{{ block.description }}</td>
              <td>{{ formatDate(block.createdAt) }}</td>
              <td>{{ block.updatedAt ? formatDate(block.updatedAt) : '-' }}</td>
              <td>
                <v-btn
                  class="text-info"
                  size="xs"
                  icon="mdi-pencil"
                  :to="`/admin/block/${block.id}`"
                />
                <v-btn
                  class="text-error"
                  size="xs"
                  icon="mdi-toy-brick-remove"
                  @click="deleteBlock(block.id)"
                />
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="100">
                <v-empty-state
                  icon="mdi-toy-brick-remove-outline"
                  title="No blocks"
                  text="Click on the Add button to create your first block"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-card>
  </v-container>
</template>
