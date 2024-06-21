<script lang="ts" setup>
const isOpen = defineModel({
  default: true,
  type: Boolean,
})
</script>

<template>
  <v-navigation-drawer v-model="isOpen">
    <v-list>
      <v-list-item
        title="Home"
        prepend-icon="mdi-home"
        to="/admin"
      />
      <v-list-item
        title="Users"
        prepend-icon="mdi-head"
        to="/admin/user"
      />
      <v-list-item
        title="Blocks"
        prepend-icon="mdi-toy-brick"
        to="/admin/block"
      />
      <v-list-item
        title="Pages"
        prepend-icon="mdi-file-document"
        to="/admin/page"
      />
      <v-divider />
      <v-list-group value="Settings">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Settings"
            prepend-icon="mdi-cog"
          />
        </template>

        <v-list-item
          title="App Name"
          to="/admin/config/app-name"
        />
        <v-list-item
          title="App Logo"
        />
        <v-list-item
          title="Contact Us"
          to="/admin/config/contact-form-recipients"
        />
        <v-list-item
          title="Theme"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
