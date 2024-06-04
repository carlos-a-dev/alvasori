import type { VAlert } from 'vuetify/components'

export type Alert = VAlert['$props']

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])

  function sendAlert(alert: Alert) {
    alerts.value.push(alert)
  }

  function removeAlert(index: number) {
    alerts.value.splice(index, 1)
  }

  return { alerts, sendAlert, removeAlert }
})
