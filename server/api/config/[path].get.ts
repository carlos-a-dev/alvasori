import { getConfig } from '~/server/utils/config'

export default eventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing parameter "path"',
    })
  }

  const config = await getConfig(path)

  if (config === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Config not found',
    })
  }

  return config
})
