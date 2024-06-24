import { PrismaClient } from '@prisma/client'
import { ref } from 'vue'

const client = ref<PrismaClient | null>(null)

export const getPrismaClient = () => {
  if (client.value === null) {
    client.value = new PrismaClient()
  }

  return client.value
}

export const removeFieldsfromSelect = <T extends Record<string, boolean> = Record<string, boolean>>(model: { fields: Record<string, unknown> }, blacklist: string[]) => {
  return Object.keys(model.fields).reduce((accum: Record<string, boolean>, key: string) => {
    accum[key] = blacklist.indexOf(key) < 0
    return accum
  }, {}) as T
}
