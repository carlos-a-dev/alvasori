import type { Page } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  return getPrismaClient().page.create({
    data: await readBody<Page>(event),
  })
})
