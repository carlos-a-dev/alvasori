import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  const userId = getRouterParam(event, 'id')

  await prisma.user.delete({
    where: {
      id: userId,
    },
  })
})
