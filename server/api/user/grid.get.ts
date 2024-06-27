import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const baseArgs: Prisma.UserFindManyArgs = {
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect<Prisma.UserSelect>(prisma.user, ['password', 'sessions']),
  }

  return {
    items: await prisma.user.findMany(parseQuery(event, baseArgs)),
    count: await prisma.user.count(),
  }
})
