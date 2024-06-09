import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const pageId = parseInt(getRouterParam(event, 'id') as string)
  const body: Partial<Page> = await readBody(event)

  body.id = pageId
  body.updatedAt = new Date()

  return await prisma.page.update({
    where: {
      id: pageId,
    },
    data: body,
  })
})
