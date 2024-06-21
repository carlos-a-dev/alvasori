import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  const select = Object.keys(prisma.block.fields).reduce((accum: Record<string, boolean>, key: string) => {
    accum[key] = ['content'].indexOf(key) < 0
    return accum
  }, {})

  return prisma.block.findMany({
    orderBy: { id: 'asc' },
    select: select as Prisma.BlockSelect,
  })
})
