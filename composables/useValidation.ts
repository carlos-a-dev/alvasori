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

    if (value !== null && value.trim() !== '' && !emailRegex.test(value)) {
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

  const vURL = (value: string) => {
    try {
      const tUrl = new URL(value)
      if (tUrl.protocol === 'http:') {
        return 'Use a safe protocol. Make sure your URL starts with "https:"'
      }

      if (tUrl.protocol !== 'https:') {
        return 'Invalid protocol. Make sure your URL starts with "https:"'
      }
    }
    catch (error) {
      return 'Invalid URL.'
    }

    return true
  }

  return {
    vRequired,
    vEmail,
    vMaxLength,
    vMinLength,
    vURL,
  }
}
