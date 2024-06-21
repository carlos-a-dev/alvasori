import type { Block } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const block: Block = await readBody(event)

  !block.createdAt && (block.createdAt = new Date())

  return prisma.block.create({
    data: block,
  })
})
