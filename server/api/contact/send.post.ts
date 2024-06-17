import type { Message } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import sgMail from '@sendgrid/mail'

const prisma = new PrismaClient()

async function sendMessage(msg: Message) {
  if (process.env.SENDGRID_API_KEY === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SendGrid API key not found!',
    })
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  await sgMail.send({
    from: 'info@alvasori.net',
    to: 'carlos.alexander.dev@gmail.com',
    subject: `Contact message from ${msg.firstName} ${msg.lastName}`,
    text: `${msg.firstName} says: ${msg.message}`,
  })
}

export default eventHandler(async (event) => {
  const message: Message = await readBody(event)

  let newMessage = await prisma.message.create({
    data: message,
  })

  try {
    await sendMessage(newMessage)

    newMessage = await prisma.message.update({
      data: {
        sent: true,
        sentDate: new Date(),
      },
      where: {
        id: newMessage.id,
      },
    })
  }
  catch (err) {
    console.error(err)
  }

  return newMessage
})
