export default eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  return await getPrismaClient().page.findUnique({ where: { slug } })
    || createError({ statusCode: 404 })
})
