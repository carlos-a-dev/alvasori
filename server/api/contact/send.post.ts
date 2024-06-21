import type { Message } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import sgMail from '@sendgrid/mail'
import { verifyRecaptcha } from '~/server/utils/googleReCaptcha'

type MessageWithCaptcha = Message & {
  'g-recaptcha-response': string | undefined
}

async function getConfig(prisma: PrismaClient, path: string) {
  return await prisma.config.findUnique({
    select: {
      path: true,
      value: true,
    },
    where: {
      path: path,
    },
  })
}

async function sendMessage(prisma: PrismaClient, msg: Message) {
  if (process.env.SENDGRID_API_KEY === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SendGrid API key not found!',
    })
  }

  const recipients = (await getConfig(prisma, 'contact-form-recipients'))?.value

  if (!recipients) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Recipient list not set',
    })
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  await sgMail.send({
    from: 'info@alvasori.net',
    to: recipients.split(','),
    replyTo: msg.email,
    subject: `Contact message from ${msg.firstName} ${msg.lastName}`,
    text: `${msg.firstName} says: ${msg.message}`,
  })
}

export default eventHandler(async (event) => {
  const prisma = new PrismaClient()
  const message: MessageWithCaptcha = await readBody<MessageWithCaptcha>(event)

  if (!message['g-recaptcha-response']) {
    return createError({
      statusCode: 403,
      statusMessage: 'Not Captcha!',
    })
  }

  const validCaptcha = await verifyRecaptcha(message['g-recaptcha-response'])

  if (!validCaptcha) {
    return createError({
      statusCode: 403,
      statusMessage: 'Invalid Captcha!',
    })
  }

  delete (message['g-recaptcha-response'])

  let newMessage = await prisma.message.create({
    data: message as Message,
  })

  try {
    await sendMessage(prisma, newMessage)

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
