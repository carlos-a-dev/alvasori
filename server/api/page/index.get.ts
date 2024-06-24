export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  return prisma.page.findMany({
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect(prisma.page, ['content']),
  })
})
