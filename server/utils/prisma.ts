import { PrismaClient } from '@prisma/client'
import { ref } from 'vue'

const client = ref<PrismaClient | null>(null)

export const getPrismaClient = () => {
  if (client.value === null) {
    client.value = new PrismaClient()
  }

  return client.value
}
