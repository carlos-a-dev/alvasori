import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

const adapter = new PrismaAdapter(client.session, client.user)

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
