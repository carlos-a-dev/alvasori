import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  const select = Object.keys(prisma.user.fields).reduce((accum: Record<string, boolean>, key: string) => {
    accum[key] = ['password'].indexOf(key) < 0
    return accum
  }, {})

  return prisma.user.findUnique({
    where: {
      id: getRouterParam(event, 'id') as string,
    },
    select: select as Prisma.UserSelect,
  })
})
