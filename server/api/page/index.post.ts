import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  return await prisma.page.create({
    data: await readBody<Page>(event),
  })
})
