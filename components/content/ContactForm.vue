<script setup lang="ts">
const valid = ref<boolean>(false)
const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')
</script>

<template>
  <v-form v-model="valid">
    <v-card
      max-width="700px"
      class="mx-auto"
    >
      <v-card-title class="font-weight-bold text-h4">
        Contact Us
      </v-card-title>
      <v-card-subtitle class="text-wrap pb-4">
        Welcome! We're here to help. Whether you have a question, need assistance, or just want to share some feedback, we're always ready to listen. Fill out the form below, and let us make your experience even better. Relax, you're in good hands!
      </v-card-subtitle>
      <v-divider />
      <v-card-text class="pt-4">
        <v-container class="pa-0">
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="firstname"
                label="First name"
                variant="solo"
                required
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="lastname"
                label="Last Name"
                variant="solo"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="email"
                label="Email"
                variant="solo"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="message"
                label="Message"
                variant="solo"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mb-4"
          block
          prepend-icon="mdi-send"
          text="Send"
          variant="tonal"
          type="submit"
          color="primary"
          size="large"
        />
      </v-card-actions>
    </v-card>
  </v-form>
</template>
