import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const select = Object.keys(prisma.block.fields).reduce((accum: Record<string, boolean>, key: string) => {
  accum[key] = ['content'].indexOf(key) < 0
  return accum
}, {})

export default eventHandler(async () => {
  return await prisma.block.findMany({
    orderBy: { id: 'asc' },
    select: select,
  })
})
