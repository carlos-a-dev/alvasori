export default eventHandler(async (event) => {
  const config = await getPrismaClient().config.findUnique({
    where: { path: getRouterParam(event, 'path') },
  })

  if (config === null) {
    throw createError({ statusCode: 404 })
  }

  return config
})
