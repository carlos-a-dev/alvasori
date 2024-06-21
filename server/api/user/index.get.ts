import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const select = Object.keys(prisma.user.fields).reduce((accum: Record<string, boolean>, key: string) => {
    accum[key] = ['password'].indexOf(key) < 0
    return accum
  }, {})

  return prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: select as Prisma.UserSelect,
  })
})
