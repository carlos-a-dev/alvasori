import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  return prisma.page.create({
    data: await readBody<Page>(event),
  })
})
