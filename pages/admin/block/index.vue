<script setup lang="ts">
const { data: blocks } = await useAsyncData('blocks', () => $fetch('/api/block'))
</script>

<template>
  <v-container>
    <v-card title="Blocks">
      <template #title>
        Users
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
          <tbody>
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
                  class="text-blue-darken-3"
                  variant="flat"
                  size="xs"
                  icon="mdi-pencil"
                  :to="`/admin/block/${block.name}`"
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
