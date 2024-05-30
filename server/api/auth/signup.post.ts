import { Argon2id } from 'oslo/password'
import { PrismaClient, Prisma } from '@prisma/client'
import { generateId } from 'lucia'

const prisma = new PrismaClient()

interface IBody {
  username: string
  password: string
  email: string
}

export default eventHandler(async (event) => {
  const body = await readBody<IBody>(event)
  const username = body.username
  if (
    typeof username !== 'string'
    || username.length < 3
    || username.length > 31
    // || !/^[a-z0-9_-]+$/.test(username)
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

  const hashedPassword = await new Argon2id().hash(password)

  try {
    const user = await prisma.user.create({
      data: {
        id: generateId(15),
        username,
        password: hashedPassword,
        email: body.email,
      },
    })

    const session = await lucia.createSession(user.id, {})
    appendHeader(
      event,
      'Set-Cookie',
      lucia.createSessionCookie(session.id).serialize(),
    )
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw createError({
        message: 'Username or email already used.',
        statusCode: 500,
      })
    }
    console.error(e)
    throw createError({
      message: 'An unknown error occurred',
      statusCode: 500,
    })
  }
})
