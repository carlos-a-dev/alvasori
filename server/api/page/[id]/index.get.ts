export default eventHandler(async (event) => {
  checkAuth(event)

  const id = parseInt(getRouterParam(event, 'id') ?? '')
  return getPrismaClient().page.findUnique({ where: { id } })
    || createError({ statusCode: 404 })
})
