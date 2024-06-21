import type { Config } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const prisma = getPrismaClient()
  const configPath = getRouterParam(event, 'path')
  const body: Partial<Config> = await readBody(event)

  body.path = configPath

  return prisma.config.update({
    where: {
      path: configPath,
    },
    data: body,
  })
})
