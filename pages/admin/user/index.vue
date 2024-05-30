<script setup lang="ts">
const { data: users } = useAsyncData('users', () => $fetch('/api/user'))
</script>

<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline">
            Users
          </h3>
        </div>
      </v-card-title>

      <v-card-text>
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
              <td>{{ user.createdAt }}</td>
              <td>{{ user.updatedAt }}</td>
              <td>
                <v-btn
                  class="text-blue-darken-3"
                  variant="flat"
                  size="xs"
                  icon="mdi-pencil"
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
      </v-card-text>
    </v-card>
  </v-container>
</template>
