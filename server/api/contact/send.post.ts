import type { Message } from '@prisma/client'
import sgMail from '@sendgrid/mail'

type MessageWithCaptcha = Message & {
  'g-recaptcha-response': string | undefined
}

async function sendMessage(msg: Message) {
  const runtimeConfig = useRuntimeConfig()

  if (!msg.to) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Empty sender.',
    })
  }

  if (runtimeConfig.SENDGRID_API_KEY === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SendGrid API key not found!',
    })
  }

  sgMail.setApiKey(runtimeConfig.SENDGRID_API_KEY)

  await sgMail.send({
    from: 'info@alvasori.net',
    to: msg.to.split(','),
    replyTo: msg.email,
    subject: `Contact message from ${msg.firstName} ${msg.lastName}`,
    text: `New message from ${msg.firstName} ${msg.lastName} (${msg.email}):\n\n${msg.message}\n\n\nAt: ${msg.createdAt.toLocaleString()}`,
  })
}

export default eventHandler(async (event) => {
  const prisma = getPrismaClient()
  const message: MessageWithCaptcha = await readBody<MessageWithCaptcha>(event)

  // Verify captcha
  if (!message['g-recaptcha-response']) {
    return createError({
      statusCode: 403,
      statusMessage: 'Not Captcha!',
    })
  }
  if (!(await verifyRecaptcha(message['g-recaptcha-response']))) {
    return createError({
      statusCode: 403,
      statusMessage: 'Invalid Captcha!',
    })
  }
  delete message['g-recaptcha-response']

  // Get recipients
  const recipients = await getConfigValue('contact-form-recipients')
  if (recipients !== null) {
    message.to = recipients
  }

  // Save message
  let newMessage = await prisma.message.create({
    data: message as Message,
  })

  try {
    // Send Message
    await sendMessage(newMessage)

    // Update message if sent successfullly
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
