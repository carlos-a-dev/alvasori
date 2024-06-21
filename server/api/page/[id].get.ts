export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()

  return prisma.page.findUnique({
    where: {
      id: parseInt(getRouterParam(event, 'id') as string),
    },
  })
})
