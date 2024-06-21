import type { Block } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  if (event.context.user === null) {
    return createError({
      statusCode: 403,
    })
  }

  const blockName = getRouterParam(event, 'name')
  const body: Partial<Block> = await readBody(event)

  body.name = blockName

  return prisma.block.update({
    where: {
      name: blockName,
    },
    data: body,
  })
})
