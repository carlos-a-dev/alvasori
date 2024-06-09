import type { InternalApi } from 'nitropack'
import { FetchError } from 'ofetch'

export type Page = NonNullable<InternalApi['/api/page/**:slug']['get']> | null

export type PageCollection = { [key: string]: (Page | null) }

export const usePageStore = defineStore('page', () => {
  const pages = ref<PageCollection>({})

  async function fetchPage(slug: string): Promise<Page | null> {
    if (slug.startsWith('/')) {
      slug = slug.replace('/', '')
    }
    if (slug === '') {
      slug = 'home'
    }

    if (pages.value[slug] === undefined) {
      try {
        const page = await $fetch(`/api/page/${slug}`) ?? null
        pages.value[slug] = page
      }
      catch (err) {
        if (err instanceof FetchError && err.statusCode === 404) {
          console.log(`Page "${slug}" not found in DB.`)
          pages.value[slug] = null
        }
        else {
          console.error((err as Error).message ?? '', err)
        }
      }
    }

    return unref(pages.value[slug])
  }

  return { pages, fetchPage }
})
