export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const userId = getRouterParam(event, 'id')

  await prisma.user.delete({
    where: {
      id: userId,
    },
  })
})
