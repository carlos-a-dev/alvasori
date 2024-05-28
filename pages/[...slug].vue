<script setup lang="ts">
definePageMeta({
  layout: 'markdown',
})
</script>

<template>
  <v-container class="px-0 px-sm-4">
    <ContentDoc v-slot="{ doc }">
      <v-card
        class="px-xs-0"
        flat
      >
        <v-card-item class="text-center">
          <v-card-title v-if="doc.showHeader ?? true">
            <h3 class="text-h3">
              {{ doc.title }}
            </h3>
          </v-card-title>
          <v-card-subtitle v-if="doc.showHeader ?? true">
            {{ doc.subtitle }}
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-container
            :class="doc.class ?? ''"
          >
            <ContentRenderer
              :value="doc"
            />
          </v-container>
        </v-card-text>
      </v-card>
    </ContentDoc>
  </v-container>
</template>
