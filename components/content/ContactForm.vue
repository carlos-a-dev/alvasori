<script setup lang="ts">
import { VForm } from 'vuetify/components'

const form = ref<VForm | null>(null)
const valid = ref<boolean | null>(null)
const loading = ref<boolean>(false)

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')

interface IAlertState {
  show: boolean
  title: string | undefined
  text: string | undefined
  type: 'info' | 'error' | 'success' | 'warning' | undefined
}

const initialAlertState: IAlertState = {
  show: false,
  title: undefined,
  text: undefined,
  type: 'info',
}
const alert = reactive<IAlertState>({ ...initialAlertState })

function onSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    resetForm()
    alert.type = 'success'
    alert.text = 'Success!'
    alert.show = true
  }, 2000)
}

function resetForm() {
  form.value?.reset()
}
</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="onSubmit"
  >
    <v-card
      class="mx-auto elevation-10"
      max-width="700px"
    >
      <v-alert
        v-model="alert.show"
        closable
        :type="alert.type"
        :title="alert.title"
        :text="alert.text"
        transition="fade-transition"
        density="compact"
        @click:close="Object.assign(alert, initialAlertState)"
      />
      <v-card-title class="font-weight-bold text-h4">
        Contact Us
      </v-card-title>
      <v-card-subtitle class="text-wrap pb-4">
        Welcome! We're here to help. Whether you have a question, need assistance, or just want to share some feedback, we're always ready to listen. Fill out the form below, and let us make your experience even better. Relax, you're in good hands!
      </v-card-subtitle>
      <v-divider />
      <v-card-text
        class="pt-4 px-6"
      >
        <v-container class="pa-0">
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="firstName"
                label="First Name"
                variant="solo"
                :rules="[vRequired]"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="lastName"
                label="Last Name"
                variant="solo"
                :rules="[vRequired]"
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
                :rules="[vRequired, vEmail]"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="message"
                label="Message"
                variant="solo"
                :rules="[vRequired]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="mb-4 px-6">
        <v-btn
          prepend-icon="mdi-send"
          text="Send"
          type="submit"
          color="primary"
          size="large"
          :disabled="!valid"
          :loading="loading"
        />

        <v-spacer />

        <v-btn
          text="Reset"
          color="warning"
          size="large"
          :disabled="loading"
          @click.prevent="resetForm()"
        />
      </v-card-actions>
    </v-card>
  </v-form>
</template>
