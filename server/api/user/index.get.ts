import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const select = Object.keys(prisma.user.fields).reduce((accum: Record<string, boolean>, key: string) => {
  accum[key] = ['password'].indexOf(key) < 0
  return accum
}, {})

export default eventHandler(async () => {
  return await prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: select as Prisma.UserSelect,
  })
})
