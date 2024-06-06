import type { InternalApi } from 'nitropack'

export type Block = InternalApi['/api/block/:name']['get']

export type BlockCollection = { [key: string]: Block }

export const useBlockStore = defineStore('alert', () => {
  const blocks = ref<BlockCollection>({})

  async function fetchBlock(name: string): Promise<Block | null> {
    if (blocks.value[name] === undefined) {
      const { data: block, error } = await useFetch(`/api/block/${name}`)
      if (error.value) {
        console.error(error.value)
      }

      if (block.value !== null) {
        blocks.value[name] = block.value
      }
    }

    return blocks.value[name] ?? null
  }

  return { blocks, fetchBlock }
})
