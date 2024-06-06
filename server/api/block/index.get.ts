import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async () => {
  return await prisma.block.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      content: false,
      createdAt: true,
      updatedAt: true,
    },
  })
})
