// middleware/adminAuth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const user = await $fetch('/api/auth/user')

  if (!user) {
    if (to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
    else { return }
  }

  if (user && to.path === '/admin/login') {
    return navigateTo('/admin')
  }

  const { useUser } = useAuth()

  const authenticatedUser = useUser()
  authenticatedUser.value = user

  setPageLayout('admin')
})
