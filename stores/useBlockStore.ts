import type { InternalApi } from 'nitropack'

export type Block = InternalApi['/api/block/:name']['get']

export type BlockCollection = { [key: string]: Block }

export const useBlockStore = defineStore('block', () => {
  const blocks = ref<BlockCollection>({})

  async function fetchBlock(name: string): Promise<Block | null> {
    if (blocks.value[name] === undefined) {
      const block = await $fetch(`/api/block/${name}`)
      if (block !== null) {
        blocks.value[name] = block
      }
    }

    return blocks.value[name] ?? null
  }

  return { blocks, fetchBlock }
})
