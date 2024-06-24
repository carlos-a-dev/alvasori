// composables/useConfirmDialog.js
import { h, render } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useNuxtApp } from '#app'

export const useConfirmDialog = () => {
  const showConfirmDialog = (title: string, message: string) => {
    const { vueApp } = useNuxtApp()
    return new Promise((resolve) => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const onConfirm = () => {
        cleanup()
        resolve(true)
      }

      const onCancel = () => {
        cleanup()
        resolve(false)
      }

      const cleanup = () => {
        render(null, container)
        document.body.removeChild(container)
      }

      const vnode = h(ConfirmDialog, { title, message, onConfirm, onCancel })
      vnode.appContext = vueApp._context

      render(vnode, container)
    })
  }

  return {
    showConfirmDialog,
  }
}
