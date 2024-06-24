import { Argon2id } from 'oslo/password'

const prisma = getPrismaClient()

interface IBody {
  'username': string
  'password': string
  'g-recaptcha-response': string
}

export default eventHandler(async (event) => {
  const body = await readBody<IBody>(event)

  if (!body['g-recaptcha-response']) {
    return createError({
      statusCode: 403,
      statusMessage: 'Invalid Captcha!',
    })
  }

  const validCaptcha = await verifyRecaptcha(body['g-recaptcha-response'])

  if (!validCaptcha) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid Captcha!',
    })
  }

  const username = body.username
  if (
    typeof username !== 'string'
    || username.length < 3
    || username.length > 31
    || !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      statusMessage: 'Invalid username',
      statusCode: 400,
    })
  }
  const password = body.password
  if (
    typeof password !== 'string'
    || password.length < 6
    || password.length > 255
  ) {
    throw createError({
      statusMessage: 'Invalid password',
      statusCode: 400,
    })
  }

  const existingUser = await prisma.user.findFirst({ where: { username } })

  if (!existingUser) {
    throw createError({
      statusMessage: 'Incorrect username or password',
      statusCode: 403,
    })
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password,
  )
  if (!validPassword) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    })
  }

  const session = await lucia.createSession(existingUser.id, {
    name: existingUser.name,
    email: existingUser.email,
  })
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize(),
  )
})
