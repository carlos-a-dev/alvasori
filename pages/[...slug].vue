<template>
  <v-container>
    <ContentDoc v-slot="{ doc }">
      <v-card
        flat
      >
        <v-card-item class="text-center">
          <v-card-title>
            <h3 class="text-h3">
              {{ doc.title }}
            </h3>
          </v-card-title>
          <v-card-subtitle>
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

<script setup lang="ts">
definePageMeta({
  layout: 'markdown',
})
</script>
