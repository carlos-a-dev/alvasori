import type { InternalApi } from 'nitropack'

export type Block = InternalApi['/api/block/:name']['get']

export type BlockCollection = { [key: string]: (Block | null) }

export const useBlockStore = defineStore('block', () => {
  const blocks = ref<BlockCollection>({})

  async function fetchBlock(name: string): Promise<Block | null> {
    if (blocks.value[name] === undefined) {
      try {
        const block = await $fetch(`/api/block/${name}`)
        blocks.value[name] = block
      }
      catch (err) {
        console.error(err)
        blocks.value[name] = null
      }
    }

    return blocks.value[name] ?? null
  }

  return { blocks, fetchBlock }
})
