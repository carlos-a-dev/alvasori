import type { Config } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const configPath = getRouterParam(event, 'path')
  const body: Partial<Config> = await readBody(event)

  body.path = configPath

  return await prisma.config.update({
    where: {
      path: configPath,
    },
    data: body,
  })
})
