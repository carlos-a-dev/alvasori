import type { Page } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  return prisma.page.create({
    data: await readBody<Page>(event),
  })
})
