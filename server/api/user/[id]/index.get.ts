import type { Prisma } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      id: getRouterParam(event, 'id'),
    },
    select: removeFieldsfromSelect(prisma.user, ['password', 'sessions']) as Prisma.UserSelect,
  })

  if (!user) {
    throw createError({
      statusCode: 404,
    })
  }

  return user
})
