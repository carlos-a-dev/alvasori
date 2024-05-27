import { sendContactEmail } from '~/utils/sendgrid'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    await sendContactEmail(body)
  }
  catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error(errMsg, error)
    return {
      status: 'error',
    }
  }

  return {
    status: 'success',
  }
})
