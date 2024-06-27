import type { Prisma } from 'prisma/prisma-client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  return await prisma.page.findMany({
    orderBy: { id: 'asc' },
    select: removeFieldsfromSelect<Prisma.PageSelect>(prisma.page, ['content']),
  })
})
