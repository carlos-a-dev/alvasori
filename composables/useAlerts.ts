import type { VAlert } from 'vuetify/components'

export type AlertOptions = Partial<VAlert['$props']>

export default () => {
  const baseAlert = (text: string, options?: AlertOptions, time?: number) => {
    const alertStore = useAlertStore()

    const alert = alertStore.sendAlert(Object.assign({ text }, options ?? {}))

    if (time) {
      // @ts-expect-error Type is too deep
      setTimeout(() => alertStore.removeAlert(alert), time)
    }
  }

  return {
    baseAlert,
    successAlert: (message: string, options?: AlertOptions, time?: number) => baseAlert(message, Object.assign({ type: 'success' }, options ?? {}), time),
    infoAlert: (message: string, options?: AlertOptions, time?: number) => baseAlert(message, Object.assign({ type: 'info' }, options ?? {}), time),
    warningAlert: (message: string, options?: AlertOptions, time?: number) => baseAlert(message, Object.assign({ type: 'warning' }, options ?? {}), time),
    errorAlert: (message: string, options?: AlertOptions, time?: number) => baseAlert(message, Object.assign({ type: 'error' }, options ?? {}), time),
  }
}
