import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const select = Object.keys(prisma.page.fields).reduce((accum: Record<string, boolean>, key: string) => {
  accum[key] = ['content'].indexOf(key) < 0
  return accum
}, {})

export default eventHandler(async () => {
  return await prisma.page.findMany({
    orderBy: { id: 'asc' },
    select: select as Prisma.PageSelect,
  })
})
