<script setup lang="ts">
import { VForm } from 'vuetify/components'

type SocialNetwork = {
  icon: string
  link: string
}
type SocialNetworkList = SocialNetwork[]

const value = defineModel<string>()

const list = computed({
  get: () => {
    try {
      return JSON.parse(value.value ?? '[]') as SocialNetworkList
    }
    catch (error) {
      console.error(error)
      return [] as SocialNetworkList
    }
  },
  set: (val: SocialNetworkList) => {
    value.value = JSON.stringify(val)
  },
})

const { vRequired, vURL } = useValidation()
const socialForm = ref<VForm>()

const { iconList } = useIconList()
const newIcon = ref('')
const newLink = ref('')

function removeSocial(index: number) {
  const updatedList = [...list.value]
  updatedList.splice(index, 1)
  list.value = updatedList
}

function editSocial(index: number) {
  if (socialForm.value === undefined || list.value[index] === undefined) {
    return
  }

  socialForm.value.reset()

  newIcon.value = list.value[index].icon.replace('mdi-', '')
  newLink.value = list.value[index].link

  removeSocial(index)
  socialForm.value.validate()
}

async function addSocial() {
  if (socialForm.value === undefined || !(await socialForm.value.validate()).valid) {
    return
  }

  list.value = [...list.value, {
    icon: `mdi-${newIcon.value}`,
    link: newLink.value,
  }]

  socialForm.value.reset()
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
        class="pa-4"
        rounded="xl"
      >
        <input
          v-show="false"
          :id="id.value"
          type="text"
          :value="value"
          :name="id.value"
        >
        <v-container class="pa-0">
          <v-form
            ref="socialForm"
            @submit.prevent="addSocial"
          >
            <v-table>
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in list"
                  :key="`${index}-${item.icon}-${item.link}`"
                >
                  <td>
                    <v-icon
                      :icon="item.icon"
                      size="large"
                      color="primary"
                    />
                    {{ item.icon }}
                  </td>
                  <td>
                    <a
                      :href="item.link"
                      target="_blank"
                    >{{ item.link }}</a>
                  </td>
                  <td>
                    <v-btn-group>
                      <v-btn
                        v-tooltip:right="'Edit'"
                        variant="text"
                        icon="mdi-pencil"
                        size="large"
                        class="text-info"
                        density="compact"
                        @click="editSocial(index)"
                      />
                      <v-btn
                        v-tooltip:right="'Delete'"
                        variant="text"
                        icon="mdi-delete"
                        size="large"
                        class="text-error"
                        density="compact"
                        @click="removeSocial(index)"
                      />
                    </v-btn-group>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <v-combobox
                      v-model="newIcon"
                      :prepend-inner-icon="`mdi-${newIcon}`"
                      :items="iconList"
                      auto-select-first
                      variant="outlined"
                      density="compact"
                      hide-details="auto"
                      :rules="[vRequired, val => iconList.indexOf(val) >= 0 || 'Invalid Icon.']"
                    >
                      <template #item="{ index, item, props }">
                        <v-list-item
                          v-bind="props"
                          :key="index"
                        >
                          <template #prepend>
                            <v-icon :icon="`mdi-${item.value}`" />
                          </template>
                          <template #title>
                            mdi-{{ item.title }}
                          </template>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </td>
                  <td>
                    <v-text-field
                      v-model="newLink"
                      placeholder="Social Network link"
                      density="compact"
                      prepend-inner-icon="mdi-web"
                      hide-details="auto"
                      :rules="[vRequired, vURL]"
                    />
                  </td>
                  <td>
                    <v-btn
                      v-tooltip:right="'Add'"
                      class="text-primary"
                      type="submit"
                      icon="mdi-plus-thick"
                      size="large"
                      density="compact"
                      @click="addSocial"
                    />
                  </td>
                </tr>
              </tfoot>
            </v-table>
          </v-form>
        </v-container>
      </v-field>
    </template>
  </v-input>
</template>
