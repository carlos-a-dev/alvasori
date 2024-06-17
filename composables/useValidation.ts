export default () => {
  const vRequired = (value: unknown) => {
    if (
      value === null
      || value === undefined
      || (typeof value === 'string' && value.trim() === '')
    ) {
      return 'Input is required.'
    }

    return true
  }

  const vEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) {
      return 'Invalid email address.'
    }

    return true
  }

  const vMaxLength = (maxLength: number) => {
    return (value: string) => {
      return value.length <= maxLength || `Input cannot be longer than ${maxLength} characters.`
    }
  }

  const vMinLength = (minLength: number) => {
    return (value: string) => {
      return value.length >= minLength || `Input must be longer than ${minLength} characters.`
    }
  }

  return {
    vRequired,
    vEmail,
    vMaxLength,
    vMinLength,
  }
}
