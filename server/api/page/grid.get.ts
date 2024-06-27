import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const baseArgs: Prisma.PageFindManyArgs = {
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect<Prisma.PageSelect>(prisma.page, ['content']),
  }

  return {
    items: await prisma.page.findMany(parseQuery(event, baseArgs)),
    count: await prisma.page.count(),
  }
})
