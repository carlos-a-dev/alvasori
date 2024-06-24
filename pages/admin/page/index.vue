<script setup lang="ts">
const { showConfirmDialog } = useConfirmDialog()

const { data: pages, refresh, status } = await useFetch('/api/page')

async function deletePage(id: number) {
  try {
    const page = pages.value?.find(page => page.id === id)
    const confirm = await showConfirmDialog('Delete Page', `Are you sure to delete "${page?.slug ?? id}"?`)
    if (confirm) {
      await $fetch(`/api/page/${id}`, { method: 'DELETE' })
      refresh()
    }
  }
  catch (error) { console.error(error) }
}
</script>

<template>
  <v-container>
    <v-card
      title="Pages"
      :loading="status === 'pending'"
    >
      <template #title>
        Pages
      </template>

      <template #append>
        <v-btn
          v-tooltip="'New page'"
          icon="mdi-plus"
          variant="flat"
          to="/admin/page/new"
        />
      </template>

      <template #text>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="pages && pages?.length > 0">
            <tr
              v-for="page in pages"
              :key="page.id"
            >
              <td>{{ page.id }}</td>
              <td>{{ page.slug }}</td>
              <td>{{ page.description }}</td>
              <td>{{ formatDate(page.createdAt) }}</td>
              <td>{{ page.updatedAt ? formatDate(page.updatedAt) : '-' }}</td>
              <td>
                <v-btn
                  class="text-blue-darken-3"
                  variant="flat"
                  size="xs"
                  icon="mdi-pencil"
                  :to="`/admin/page/${page.id}`"
                />
                <v-btn
                  class="text-red-darken-4"
                  variant="flat"
                  size="xs"
                  icon="mdi-trash-can"
                  @click="deletePage(page.id)"
                />
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="100">
                <v-empty-state
                  title="No pages"
                  text="Click on the + button to create your first page"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-card>
  </v-container>
</template>
