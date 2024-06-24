import type { Config } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  return updateConfig(
    getRouterParam(event, 'path') ?? '',
    await readBody<Partial<Config>>(event),
  )
})
