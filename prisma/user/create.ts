import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function create() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      username: 'alice',
      password: '12345678',
    },
  })
  console.log(user)
  await prisma.$disconnect()
}
