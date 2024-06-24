export default eventHandler(async (event) => {
  checkAuth(event)

  const id = parseInt(getRouterParam(event, 'id') ?? '')
  return await getPrismaClient().block.findUnique({ where: { id } })
    || createError({ statusCode: 404 })
})
