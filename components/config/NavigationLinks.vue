<script setup lang="ts">
type NavigationLink = {
  label: string
  link: string
}
type NavigationLinkList = NavigationLink[]

const value = defineModel<string>()

const list = computed({
  get: () => {
    try {
      return JSON.parse(value.value ?? '[]') as NavigationLinkList
    }
    catch (error) {
      console.error(error)
      return [] as NavigationLinkList
    }
  },
  set: (val: NavigationLinkList) => {
    value.value = JSON.stringify(val)
  },
})

const linkInEdit = ref<number | null>(null)

const newNavigationLink = ref<NavigationLink>({
  label: '',
  link: '',
})

function resetNewNavigationLink() {
  newNavigationLink.value = {
    label: '',
    link: '',
  }
}

function editLink(index: number) {
  if (list.value[index] === undefined) {
    return
  }

  linkInEdit.value = index
  newNavigationLink.value.label = list.value[index].label
  newNavigationLink.value.link = list.value[index].link
}

function cancelEdit() {
  linkInEdit.value = null
  resetNewNavigationLink()
}

function swap(index1: number, index2: number) {
  if (linkInEdit.value === index1) {
    linkInEdit.value = index2
  }
  else if (linkInEdit.value === index2) {
    linkInEdit.value = index1
  }
  const tempList = [...list.value]
  const temp = tempList[index1]
  tempList[index1] = tempList[index2]
  tempList[index2] = temp

  list.value = tempList
}

function removeLink(index: number) {
  if (linkInEdit.value === index) {
    linkInEdit.value = null
    resetNewNavigationLink()
  }
  const tempList = [...list.value]
  tempList.splice(index, 1)
  list.value = tempList
}

function addLink() {
  const tempList = [...list.value]
  if (linkInEdit.value !== null) {
    tempList[linkInEdit.value] = newNavigationLink.value
    linkInEdit.value = null
  }
  else {
    tempList.push(newNavigationLink.value)
  }
  list.value = tempList

  resetNewNavigationLink()
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
          <v-data-table
            id="nav-links-table"
            :items="list"
            :headers="[
              { title: 'Label', key: 'label', sortable: false },
              { title: 'Link', key: 'link', sortable: false },
              { title: 'Actions', key: 'actions', sortable: false },
            ]"
            item-value="link"
            hide-default-footer
          >
            <template #item="{ item, index }">
              <tr
                :class="{ 'bg-yellow-lighten-3': linkInEdit === index }"
                class="v-data-table__tr"
              >
                <td class="v-data-table__td v-data-table-column--align-start">
                  {{ item.label }}
                </td>
                <td class="v-data-table__td v-data-table-column--align-start">
                  {{ item.link }}
                </td>
                <td class="v-data-table__td v-data-table-column--align-start">
                  <v-btn-group
                    density="compact"
                    variant="text"
                  >
                    <v-btn
                      icon="mdi-pencil"
                      color="primary"
                      @click="editLink(index)"
                    />
                    <v-btn
                      icon="mdi-trash-can"
                      color="error"
                      @click="removeLink(index)"
                    />
                  </v-btn-group>
                  &nbsp;
                  <v-btn-group
                    density="compact"
                    rounded="pill"
                    style="height: 24px"
                  >
                    <v-btn
                      v-if="index > 0"
                      icon="mdi-arrow-up"
                      color="primary"
                      size="small"
                      @click="swap(index, index - 1)"
                    />
                    <v-btn
                      v-if="index < (list.length - 1)"
                      icon="mdi-arrow-down"
                      color="secondary"
                      size="small"
                      @click="swap(index, index + 1)"
                    />
                  </v-btn-group>
                </td>
              </tr>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #body.append>
              <tr class="v-data-table__tr">
                <td class="v-data-table__td v-data-table-column--align-start">
                  <v-text-field
                    v-model.trim="newNavigationLink.label"
                    density="compact"
                    hide-details="auto"
                    label="Label"
                  />
                </td>
                <td class="v-data-table__td v-data-table-column--align-start">
                  <v-text-field
                    v-model.trim="newNavigationLink.link"
                    density="compact"
                    hide-details
                    label="Link"
                  />
                </td>
                <td class="v-data-table__td v-data-table-column--align-start">
                  <v-btn
                    :icon="linkInEdit === null ? 'mdi-plus' : 'mdi-content-save'"
                    color="primary"
                    variant="text"
                    @click="addLink()"
                  />
                  <v-btn
                    :disabled="linkInEdit === null || !(newNavigationLink.label || newNavigationLink.link)"
                    icon="mdi-cancel"
                    color="error"
                    variant="text"
                    @click="cancelEdit()"
                  />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-field>
    </template>
  </v-input>
</template>
