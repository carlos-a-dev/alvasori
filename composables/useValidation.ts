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

export const vMaxLength = (maxLength: number) => {
  return (value: string) => {
    return value.length <= maxLength || `Input cannot be longer than ${maxLength} characters.`
  }
}

export const vMinLength = (minLength: number) => {
  return (value: string) => {
    return value.length >= minLength || `Input must be longer than ${minLength} characters.`
  }
}
