export default eventHandler(async (event) => {
  return await getConfig(getRouterParam(event, 'path') ?? '')
    || createError({ statusCode: 404 })
})
