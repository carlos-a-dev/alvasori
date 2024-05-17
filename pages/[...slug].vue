<template>
  <v-container>
    <ContentDoc v-slot="{ doc }">
      <v-card
        flat
      >
        <v-card-item class="text-center">
          <v-card-title class="text-h3">
            {{ doc.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ doc.subtitle }}
          </v-card-subtitle>
        </v-card-item>
        <v-divider />
        <v-card-text class="text-justify">
          <ContentRenderer :value="doc" />
        </v-card-text>
      </v-card>
    </ContentDoc>
  </v-container>
</template>
