import type { Block } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const block: Block = await readBody(event)

  !block.createdAt && (block.createdAt = new Date())

  return await prisma.block.create({
    data: block,
  })
})
