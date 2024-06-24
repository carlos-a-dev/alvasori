export default eventHandler(async (event) => {
  const config = await getConfig(getRouterParam(event, 'path') ?? '')

  if (!config) {
    throw createError({ statusCode: 404 })
  }

  return config
})
