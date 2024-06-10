import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { Argon2id } from 'oslo/password'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body: Partial<User> = await readBody(event)

  body.id = id
  body.updatedAt = new Date()

  if (body.password !== undefined && body.password.trim() !== '') {
    body.password = await new Argon2id().hash(body.password)
  }
  else {
    delete (body.password)
  }

  return await prisma.user.update({
    where: {
      id: id,
    },
    data: body,
  })
})
