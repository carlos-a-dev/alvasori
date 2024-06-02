import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  const body: Partial<User> = await readBody(event)

  body.id = userId
  body.updatedAt = new Date()

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: body,
  })
})
