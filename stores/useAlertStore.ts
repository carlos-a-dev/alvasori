import type { VAlert } from 'vuetify/components'

export type Alert = VAlert['$props']

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Array<Alert>>([])

  function sendAlert(alert: Alert) {
    // @ts-expect-error Type is too deep
    alerts.value.push(alert)
    return alerts.value[alerts.value.length - 1]
  }

  function removeAlert(alert: Alert) {
    alerts.value.splice(alerts.value.indexOf(alert), 1)
  }

  return { alerts, sendAlert, removeAlert }
})
