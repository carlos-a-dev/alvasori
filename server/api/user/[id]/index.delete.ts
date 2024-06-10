import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')

  await prisma.user.delete({
    where: {
      id: userId,
    },
  })
})
