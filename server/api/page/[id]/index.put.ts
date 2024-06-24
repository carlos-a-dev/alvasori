import type { Page } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  return getPrismaClient().page.update({
    where: {
      id: parseInt(getRouterParam(event, 'id') ?? ''),
    },
    data: await readBody<Partial<Page>>(event),
  })
})
