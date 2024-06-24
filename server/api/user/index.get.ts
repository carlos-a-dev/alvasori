export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  return prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: removeFieldsfromSelect(prisma.user, ['password']),
  })
})
