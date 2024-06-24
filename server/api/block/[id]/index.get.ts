export default eventHandler(async (event) => {
  checkAuth(event)

  const id = parseInt(getRouterParam(event, 'id') ?? '')
  const block = await getPrismaClient().block.findUnique({ where: { id } })

  if (!block) {
    throw createError({ statusCode: 404 })
  }

  return block as NonNullable<typeof block>
})
