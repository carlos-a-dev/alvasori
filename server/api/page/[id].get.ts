import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  return await prisma.page.findUnique({
    where: {
      id: parseInt(getRouterParam(event, 'id') as string),
    },
  })
})
