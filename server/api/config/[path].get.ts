import type { Config } from '@prisma/client'

export default eventHandler(async (event) => {
  const prisma = getPrismaClient()
  const path = getRouterParam(event, 'path')

  const config: Config | null = await prisma.config.findUnique({
    where: {
      path: path,
    },
  })

  if (config === null) {
    setResponseStatus(event, 404)
    return
  }

  return config
})
