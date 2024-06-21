import { Argon2id } from 'oslo/password'

const prisma = getPrismaClient()

interface IBody {
  username: string
  password: string
}

export default eventHandler(async (event) => {
  const body = await readBody<IBody>(event)
  const username = body.username
  if (
    typeof username !== 'string'
    || username.length < 3
    || username.length > 31
    || !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: 'Invalid username',
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
      message: 'Invalid password',
      statusCode: 400,
    })
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  })

  if (!existingUser) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
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
    // name: existingUser.name,
    // email: existingUser.email,
  })
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize(),
  )
})
