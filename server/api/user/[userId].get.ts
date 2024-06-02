import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (user === null) {
    setResponseStatus(event, 404)
    return
  }

  return user
})
