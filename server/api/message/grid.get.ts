import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const baseArgs: Prisma.MessageFindManyArgs = {
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect<Prisma.MessageSelect>(prisma.message, ['content']),
  }

  return {
    items: await prisma.message.findMany(parseQuery(event, baseArgs)),
    count: await prisma.message.count(),
  }
})
