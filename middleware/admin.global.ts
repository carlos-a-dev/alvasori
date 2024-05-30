// middleware/adminAuth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const { data: user } = await useFetch('/api/auth/user')

  if (!user.value) {
    if (to.path !== '/admin/login') {
      return await navigateTo('/admin/login')
    }
    else { return }
  }

  if (user.value && to.path === '/admin/login') {
    return await navigateTo('/admin')
  }

  const authenticatedUser = useUser()
  authenticatedUser.value = user.value

  setPageLayout('admin')
})
