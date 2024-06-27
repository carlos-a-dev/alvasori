<script setup lang="ts">
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Email', key: 'email' },
  { title: 'Message', key: 'message' },
  { title: 'Sent', key: 'sent' },
  { title: 'Sent Date', key: 'sentDate', value: (message: Record<string, string>) => formatDate(message.sentDate) },
  { title: 'Created At', key: 'createdAt', value: (message: Record<string, string>) => formatDate(message.createdAt) },
  { title: 'Updated At', key: 'updatedAt', value: (message: Record<string, string>) => formatDate(message.updatedAt) },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <container-grid title="Messages">
    <template #append>
      <v-btn
        v-tooltip="'New Message'"
        icon="mdi-plus"
        to="/admin/message/new"
      />
    </template>
    <as-grid
      api-endpoint="/api/message/grid"
      :headers="headers"
      :sort-by="[{ key: 'createdAt', order: 'desc' }]"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.sent="{ item }">
        <v-switch
          color="success"
          :model-value="item.sent"
          density="compact"
          :readonly="true"
          hide-details
        />
      </template>
    </as-grid>
  </container-grid>
</template>
