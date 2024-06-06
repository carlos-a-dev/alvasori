import type { Block } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const blockName = getRouterParam(event, 'name')
  const body: Partial<Block> = await readBody(event)

  body.name = blockName
  body.updatedAt = new Date()

  return await prisma.block.update({
    where: {
      name: blockName,
    },
    data: body,
  })
})
