<script setup lang="ts">
import { VForm } from 'vuetify/components'

const { vEmail } = useValidation()

const value = defineModel<string>()
const newEmailForm = ref<VForm>()
const newEmail = ref('')

const emailList = computed<string[]>({
  get: () => !value.value ? [] : value.value.split(','),
  set: val => value.value = val.join(','),
})

async function submitNewEmail() {
  if (
    newEmailForm.value === undefined
    || newEmail.value === null
    || newEmail.value.trim() === ''
    || !(await newEmailForm.value.validate()).valid
  ) {
    return
  }

  if (emailList.value.indexOf(newEmail.value) >= 0) {
    newEmailForm.value.reset()
    return
  }

  emailList.value = [...emailList.value, newEmail.value]
  newEmailForm.value.reset()
}

function removeEmail(index: number) {
  const updatedList = [...emailList.value]
  updatedList.splice(index, 1)
  emailList.value = updatedList
}
</script>

<template>
  <v-input
    v-model="value"
  >
    <template #default="{ id, isDirty, isValid, isPristine }">
      <v-field
        v-bind="$attrs"
        :id="id.value"
        v-model="value"
        :active="value !== undefined && value?.length > 0"
        :dirty="isDirty.value"
        :error="!isPristine.value && !isValid.value"
        variant="outlined"
        class="pa-5"
        rounded="pill"
      >
        <input
          v-show="false"
          :id="id.value"
          type="text"
          :value="value"
          :name="id.value"
        >
        <v-container class="pa-0">
          <v-row
            align="center"
            justify="start"
          >
            <v-col
              v-for="(email, i) in emailList"
              :key="`${i}-${email}`"
              class="py-1 pe-0"
              cols="auto"
            >
              <v-chip
                closable
                density="compact"
                @click:close="removeEmail(i)"
              >
                {{ email }}
              </v-chip>
            </v-col>

            <v-col
              class="py-1 pe-0"
              cols="auto"
            >
              <v-form
                ref="newEmailForm"
                @submit.prevent="submitNewEmail"
              >
                <v-text-field
                  v-model="newEmail"
                  placeholder="new@email.here"
                  density="compact"
                  class="pa-0 new-email-field"
                  variant="outlined"
                  hide-details="auto"
                  min-width="300px"
                  :rules="[vEmail, (val) => emailList.indexOf(val) < 0 || 'The email is already on the list.']"
                >
                  <template #append-inner>
                    <v-btn
                      v-tooltip:end="'Add'"
                      icon="mdi-plus"
                      density="compact"
                      type="submit"
                      size="xs"
                      :ripple="false"
                      @click="submitNewEmail"
                    />
                  </template>
                </v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-field>
    </template>
  </v-input>
</template>

<style>
.new-email-field .v-field__input {
  padding-top: 0;
  padding-bottom: 0;
  min-height: auto;
  height: 25px;
}
</style>
