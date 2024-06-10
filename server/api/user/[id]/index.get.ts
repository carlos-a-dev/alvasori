import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const select = Object.keys(prisma.user.fields).reduce((accum: Record<string, boolean>, key: string) => {
    accum[key] = ['password'].indexOf(key) < 0
    return accum
  }, {})

  return await prisma.user.findUnique({
    where: {
      id: getRouterParam(event, 'id') as string,
    },
    select: select as Prisma.UserSelect,
  })
})
