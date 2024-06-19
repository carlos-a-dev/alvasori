import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  const prisma = new PrismaClient()
  const slug = getRouterParam(event, 'slug')

  const page: Page | null = await prisma.page.findUnique({
    where: {
      slug: slug,
    },
  })

  if (page === null) {
    setResponseStatus(event, 404)
    return
  }

  return page
})
