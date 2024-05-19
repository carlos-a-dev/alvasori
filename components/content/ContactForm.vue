<script setup lang="ts">
const valid = ref<boolean>(false)
const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="12"
        >
          <v-text-field
            v-model="firstname"
            label="First name"
            variant="outlined"
            density="compact"
            clearable
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
            variant="outlined"
            density="compact"
            clearable
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
            variant="outlined"
            density="compact"
            clearable
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="message"
            label="Message"
            variant="outlined"
            density="compact"
            clearable
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="text-center"
        >
          <v-btn
            text="Submit"
            type="submit"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
