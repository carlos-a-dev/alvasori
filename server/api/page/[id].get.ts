import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()

  return prisma.page.findUnique({
    where: {
      id: parseInt(getRouterParam(event, 'id') as string),
    },
  })
})
