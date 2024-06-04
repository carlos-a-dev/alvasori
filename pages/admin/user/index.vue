<script setup lang="ts">
const { data: users } = await useAsyncData('users', () => $fetch('/api/user'))
</script>

<template>
  <v-container>
    <v-card title="Users">
      <template #title>
        Users
      </template>

      <template #append>
        <v-btn
          v-tooltip="'New User'"
          icon="mdi-plus"
          variant="flat"
          to="/admin/user/new"
        />
      </template>

      <template #text>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>E-mail</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.name }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>{{ user.updatedAt ? formatDate(user.updatedAt) : '-' }}</td>
              <td>
                <v-btn
                  class="text-blue-darken-3"
                  variant="flat"
                  size="xs"
                  icon="mdi-pencil"
                  :to="`/admin/user/${user.id}`"
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
