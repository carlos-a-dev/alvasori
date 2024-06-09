import markdownParser from '@nuxt/content/transformers/markdown'
import type { ParsedContent } from '@nuxt/content/types'
import { FetchError } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const slug = to.path

  const pageStore = usePageStore()

  const parsedContent = useState<ParsedContent | null>('parsed-content', () => null)
  parsedContent.value = null

  const page = await pageStore.fetchPage(slug)

  if (page !== null && markdownParser.parse !== undefined) {
    parsedContent.value = await markdownParser.parse(slug, page.content ?? '', {})
  }

  try {
    if (parsedContent.value === null) {
      parsedContent.value = await queryContent(`${slug}`).findOne()
    }
  }
  catch (err) {
    if (err instanceof FetchError && err.statusCode === 404) {
      console.log(`Page "${slug}" not found in content folder.`)
    }
    else {
      console.error((err as Error).message ?? '', err)
    }
    parsedContent.value = null
  }

  if (parsedContent.value === null) {
    return false
  }

  setPageLayout(parsedContent.value?.layout ?? 'markdown')
})
