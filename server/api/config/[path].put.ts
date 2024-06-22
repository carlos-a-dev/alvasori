import type { Config } from '@prisma/client'

export default eventHandler(async (event) => {
  checkAuth(event)

  const path = getRouterParam(event, 'path')
  if (!path) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing parameter "path"',
    })
  }

  const body: Partial<Config> = await readBody(event)

  return updateConfig(path, body)
})
