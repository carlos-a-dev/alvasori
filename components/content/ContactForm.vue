<script setup lang="ts">
import { VForm } from 'vuetify/components'

const { sendAlert } = useAlertStore()

const form = ref<VForm | null>(null)
const valid = ref(false)
const loading = ref(false)

const payload = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
})

async function onSubmit() {
  loading.value = true

  try {
    const message = await $fetch('/api/contact/send', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    console.debug(message) // debug
    resetForm()

    sendAlert({
      type: 'success',
      text: 'Success!',
    })
  }
  catch (error) {
    console.log(error)
    errorAlert('Your message could not be delivered, please try again later.')
  }
  finally {
    loading.value = false
  }

  setTimeout(() => {
    loading.value = false
    resetForm()
    sendAlert({
      type: 'success',
      text: 'Success!',
    })
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
      :loading="loading"
    >
      <template #title>
        Contact Us
      </template>
      <template #subtitle>
        <p class="text-wrap">
          Welcome! We're here to help. Whether you have a question, need assistance, or just want to share some feedback, we're always ready to listen. Fill out the form below, and let us make your experience even better. Relax, you're in good hands!
        </p>
      </template>

      <template #text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="payload.firstName"
                label="First Name"
                :rules="[vRequired]"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-text-field
                v-model="payload.lastName"
                label="Last Name"
                :rules="[vRequired]"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="payload.email"
                label="Email"
                :rules="[vRequired, vEmail]"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="payload.message"
                label="Message"
                :rules="[vRequired, vMaxLength(500)]"
                counter="500"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template #actions>
        <v-container class="d-flex flex-row">
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
            color="secondary"
            size="large"
            :disabled="loading"
            @click.prevent="resetForm()"
          />
        </v-container>
      </template>
    </v-card>
  </v-form>
</template>
