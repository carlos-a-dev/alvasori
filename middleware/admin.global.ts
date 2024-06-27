// middleware/adminAuth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const user = await $fetch('/api/auth/user', { params: { t: Date.now() } })
  if (!user) {
    if (to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
    return
  }

  if (user && to.path === '/admin/login') {
    return navigateTo('/admin')
  }

  useAuth().useUser().value = user

  setPageLayout('admin')
})
