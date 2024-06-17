import type { VAlert } from 'vuetify/components'

export type AlertOptions = Partial<VAlert['$props']> & { time?: number }

export default () => {
  const baseAlert = (text: string, options?: AlertOptions) => {
    const alertStore = useAlertStore()

    let alertProps: AlertOptions = {
      text: text,
    }

    let time: number | null = null

    if (options && options.time) {
      time = options.time
      delete (options.time)
    }

    if (options !== undefined) {
      alertProps = Object.assign(alertProps, options)
    }

    const alert = alertStore.sendAlert(alertProps)

    if (time !== null) {
      setTimeout(() => {
        // @ts-expect-error Type is too deep
        alertStore.removeAlert(alert)
      }, time)
    }
  }

  const successAlert = (message: string, options?: AlertOptions) => {
    baseAlert(message, Object.assign({ type: 'success' }, options ?? {}))
  }

  const infoAlert = (message: string, options?: AlertOptions) => {
    baseAlert(message, Object.assign({ type: 'info' }, options ?? {}))
  }

  const warningAlert = (message: string, options?: AlertOptions) => {
    baseAlert(message, Object.assign({ type: 'warning' }, options ?? {}))
  }

  const errorAlert = (message: string, options?: AlertOptions) => {
    baseAlert(message, Object.assign({ type: 'error' }, options ?? {}))
  }

  return {
    baseAlert,
    successAlert,
    infoAlert,
    warningAlert,
    errorAlert,
  }
}
