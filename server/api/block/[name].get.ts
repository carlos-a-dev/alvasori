import type { Block } from '@prisma/client'

export default eventHandler(async (event) => {
  const prisma = getPrismaClient()

  const name = getRouterParam(event, 'name')

  const block: Block | null = await prisma.block.findUnique({
    where: {
      name: name,
    },
  })

  if (block === null) {
    setResponseStatus(event, 404)
    return
  }

  return block
})
