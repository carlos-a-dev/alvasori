export default eventHandler(async (event) => {
  checkAuth(event)

  const id = parseInt(getRouterParam(event, 'id') ?? '')
  return getPrismaClient().page.delete({ where: { id } })
})
