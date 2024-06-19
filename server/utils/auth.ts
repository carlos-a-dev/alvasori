import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import type { EventHandlerRequest, H3Event } from 'h3'

const client = new PrismaClient()

const adapter = new PrismaAdapter(client.session, client.user)

export const checkAuth = (event: H3Event<EventHandlerRequest>) => {
  if (event.context.user === null) {
    sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Not Authorized',
      }),
      import.meta.dev,
    )
  }
}

export const lucia = new Lucia(adapter, {
  getUserAttributes: (databaseUser: Partial<User>) => {
    return {
      username: databaseUser.username,
      name: databaseUser.name,
    }
  },
  sessionCookie: {
    // IMPORTANT!
    attributes: {
      // set to `true` when using HTTPS
      secure: !import.meta.dev,
    },
  },
})

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
  }
}
