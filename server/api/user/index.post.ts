import type { User } from '@prisma/client'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'

export default eventHandler(async (event) => {
  checkAuth(event)

  const user = await readBody<User>(event)
  return getPrismaClient().user.create({
    data: {
      ...user,
      id: generateId(15),
      password: await new Argon2id().hash(user.password.trim()),
    },
  })
})
