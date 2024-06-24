import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const select = removeFieldsfromSelect<Prisma.BlockSelect>(prisma.block, ['content'])
  return prisma.block.findMany({
    orderBy: { id: 'asc' },
    select,
  })
})
