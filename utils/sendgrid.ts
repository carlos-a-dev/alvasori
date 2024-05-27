import type { MailDataRequired } from '@sendgrid/mail'
import sendgrid from '@sendgrid/mail'

export const sendEmail = async (msg: object | object[]) => {
  sendgrid.setApiKey('API_KEY' /* process.env.SENDGRID_API_KEY ?? '' */)
  return await sendgrid.send(msg as (MailDataRequired | MailDataRequired[]))
}

export const sendContactEmail = async (body: { [key: string]: string }) => {
  return await sendEmail({
    to: 'receiver@alvasori.net',
    from: 'info@alvasori.net',
    templateId: 'template-id',
    reply_to: {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
    },
    dynamicTemplateData: body,
  })
}
