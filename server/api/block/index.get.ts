import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const args: Prisma.BlockFindManyArgs = {
    select: removeFieldsfromSelect<Prisma.BlockSelect>(prisma.block, ['content']),
  }

  return await prisma.block.findMany(args)
})
