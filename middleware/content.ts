import type { ParsedContent } from '@nuxt/content/types'
import { FetchError } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const slug = to.path === '' || to.path === '/' ? 'home' : to.path.replace('/', '')

  const doc = useState<ParsedContent>('content_rendered')

  try {
    doc.value = await $fetch<ParsedContent>(`/api/content/${slug}`)
  }
  catch (error) {
    if (error instanceof FetchError && error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found!',
      })
    }

    throw error
  }

  setPageLayout(doc.value.layout ?? 'markdown')
})
