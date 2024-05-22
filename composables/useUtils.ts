export const debounce = (callback: (...args: never[]) => void, wait: number) => {
  let timeoutId: number | undefined
  return (...args: never[]) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}
