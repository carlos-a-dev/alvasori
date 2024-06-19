import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { Argon2id } from 'oslo/password'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  const id = getRouterParam(event, 'id')
  const body: Partial<User> = await readBody(event)

  body.id = id

  if (body.password !== undefined && body.password.trim() !== '') {
    body.password = await new Argon2id().hash(body.password)
  }
  else {
    delete (body.password)
  }

  return prisma.user.update({
    where: {
      id: id,
    },
    data: body,
  })
})
