import type { Block } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  return getPrismaClient().block.create({
    data: await readBody<Block>(event),
  })
})
