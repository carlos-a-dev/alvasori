import type { User } from '@prisma/client'
import { Argon2id } from 'oslo/password'

export default eventHandler(async (event) => {
  checkAuth(event)

  const data = await readBody<Partial<User>>(event)

  if (data.password && data.password.trim() !== '') {
    data.password = await new Argon2id().hash(data.password.trim())
  }
  else {
    delete data.password
  }

  return getPrismaClient().user.update({
    where: {
      id: getRouterParam(event, 'id'),
    },
    data,
  })
})
