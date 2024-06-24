import markdownParser from '@nuxt/content/transformers/markdown'
import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  let slug = getRouterParam(event, 'slug')

  const page = await getPrismaClient().page.findUnique({ where: { slug } })
  if (page !== null && markdownParser.parse !== undefined) {
    return markdownParser.parse(`${slug}.md`, page.content, {})
  }

  if (slug === 'home') {
    slug = ''
  }

  return await serverQueryContent(event, `/${slug}`).findOne()
    || createError({ statusCode: 404 })
})
