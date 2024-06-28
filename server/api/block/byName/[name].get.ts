export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  const block = await getPrismaClient().block.findUnique({ where: { name } })

  if (!block) {
    throw createError({ statusCode: 404 })
  }

  return block
})
