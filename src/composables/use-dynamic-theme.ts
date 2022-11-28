import { Dark, setCssVar } from 'quasar'
import { useConfigStore } from 'stores/config'
import { watchEffect } from 'vue'

export function useDynamicTheme () {
  const { config } = useConfigStore()

  // Set theme dinamically
  watchEffect(() => {
    const theme: Record<string, string> = config.theme
    Object.entries(theme).forEach(([code, value]) => {
      setCssVar(code, value)
    })
  })

  // Set dark mode dinamically
  watchEffect(() => {
    Dark.set(config.dark_mode)
  })
}
