export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  return await getPrismaClient().block.findUnique({ where: { name } })
    || createError({ statusCode: 404 })
})
