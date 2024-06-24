export default eventHandler(async (event) => {
  checkAuth(event)

  return getPrismaClient().user.delete({ where: { id: getRouterParam(event, 'id') } })
})
