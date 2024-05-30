export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.username === 'carlos' && body.password === '12345678') {
    setResponseStatus(event, 200)
    return {
      token: 'ABC123',
    }
  }

  setResponseStatus(event, 403)
})
