import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async () => {
  return await prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  })
})
