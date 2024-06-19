import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  const pageId = parseInt(getRouterParam(event, 'id') as string)
  const body: Partial<Page> = await readBody(event)

  body.id = pageId
  body.updatedAt = new Date()

  return prisma.page.update({
    where: {
      id: pageId,
    },
    data: body,
  })
})
