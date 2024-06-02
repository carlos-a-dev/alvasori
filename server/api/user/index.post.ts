import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { generateId } from 'lucia'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const user: User = await readBody(event)

  user.id = generateId(15)
  !user.createdAt && (user.createdAt = new Date())

  return await prisma.user.create({
    data: user,
  })
})
