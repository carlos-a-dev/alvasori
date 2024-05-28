import { useAuthStore } from '~/stores/auth'

// middleware/adminAuth.ts
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (!to.path.startsWith('/admin')) return

  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  if (!authStore.authenticated && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (authStore.authenticated && to.path === '/admin/login') {
    return navigateTo('/admin')
  }

  setPageLayout('admin')
})
