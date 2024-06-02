export const debounce = (callback: (...args: never[]) => void, wait: number) => {
  let timeoutId: number | undefined
  return (...args: never[]) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

export const formatDate = (date: string | Date | null) => {
  if (date === null) {
    return '-'
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric' }
  if (date instanceof Date) {
    return date.toLocaleDateString('en-us', options)
  }

  return new Date(date).toLocaleDateString('en-us', options)
}
