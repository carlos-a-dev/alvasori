import type { Block } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  return getPrismaClient().block.update({
    where: {
      id: parseInt(getRouterParam(event, 'id') ?? ''),
    },
    data: await readBody<Partial<Block>>(event),
  })
})
