<script setup lang="ts">
const { data: pages } = await useAsyncData('pages', () => $fetch('/api/page'))
</script>

<template>
  <v-container>
    <v-card title="Pages">
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
          <tbody>
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
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-card>
  </v-container>
</template>
