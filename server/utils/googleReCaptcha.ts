type VerifyReCaptchaResponse = {
  'success': boolean
  'challenge_ts': string // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  'hostname': string // the hostname of the site where the reCAPTCHA was solved
  'error-codes': string[] | undefined // optional
}

export const verifyRecaptcha = async (reCaptchaResponse: string) => {
  const config = useRuntimeConfig()

  const params = new URLSearchParams()
  params.append('secret', config.RECAPTCHA_SECRET_KEY)
  params.append('response', reCaptchaResponse)

  const response = await $fetch<VerifyReCaptchaResponse>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (response.success) {
    return true
  }

  if (response['error-codes'] !== undefined && response['error-codes'].length > 0) {
    console.error('Error verifying captcha.', 'Error Codes:', response['error-codes'], response)
  }

  return false
}
