import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import markdownParser from '@nuxt/content/transformers/markdown'
import { serverQueryContent } from '#content/server'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  let slug = getRouterParam(event, 'slug')

  const page: Page | null = await prisma.page.findUnique({
    where: {
      slug: slug,
    },
  })

  if (page !== null && markdownParser.parse !== undefined) {
    return await markdownParser.parse(`${slug}.md`, page.content, {})
  }

  if (slug === 'home') {
    slug = ''
  }

  return await serverQueryContent(event, `/${slug}`).findOne() || createError({
    statusCode: 404,
    statusMessage: 'Page not found!',
  })
})
