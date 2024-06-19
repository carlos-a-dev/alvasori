import type { Page } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import markdownParser from '@nuxt/content/transformers/markdown'
import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  const prisma = new PrismaClient()

  let slug = getRouterParam(event, 'slug')

  const page: Page | null = await prisma.page.findUnique({
    where: {
      slug: slug,
    },
  })

  if (page !== null && markdownParser.parse !== undefined) {
    return markdownParser.parse(`${slug}.md`, page.content, {})
  }

  if (slug === 'home') {
    slug = ''
  }

  return await serverQueryContent(event, `/${slug}`).findOne() || createError({
    statusCode: 404,
    statusMessage: 'Page not found!',
  })
})
