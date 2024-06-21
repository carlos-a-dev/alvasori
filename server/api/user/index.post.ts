import type { User } from '@prisma/client'
import { generateId } from 'lucia'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const user: User = await readBody(event)

  user.id = generateId(15)
  !user.createdAt && (user.createdAt = new Date())

  return prisma.user.create({
    data: user,
  })
})
