export const vRequired = (value: unknown) => {
  if (
    value === null
    || value === undefined
    || (typeof value === 'string' && value.trim() === '')
  ) {
    return 'Input is required.'
  }

  return true
}

export const vEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    return 'Invalid email address.'
  }

  return true
}
