export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  return prisma.user.findUnique({
    where: {
      id: getRouterParam(event, 'id'),
    },
    select: removeFieldsfromSelect(prisma.user, ['password']),
  })
})
