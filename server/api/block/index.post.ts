import type { Block } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = new PrismaClient()
  const block: Block = await readBody(event)

  !block.createdAt && (block.createdAt = new Date())

  return prisma.block.create({
    data: block,
  })
})
