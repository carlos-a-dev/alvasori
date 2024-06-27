import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const baseArgs: Prisma.BlockFindManyArgs = {
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect<Prisma.BlockSelect>(prisma.block, ['content']),
  }

  return {
    items: await prisma.block.findMany(parseQuery(event, baseArgs)),
    count: await prisma.block.count(),
  }
})
