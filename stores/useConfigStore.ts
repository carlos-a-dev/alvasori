import type { InternalApi } from 'nitropack'

export type Config = NonNullable<InternalApi['/api/config/:path']['get']>

export type ConfigCollection = { [key: string]: (Config | null) }

export const useConfigStore = defineStore('config', () => {
  const configs = ref<ConfigCollection>({})

  async function fetchConfig(path: string): Promise<Config | null> {
    if (configs.value[path] === undefined) {
      try {
        const config = await $fetch<Config>(`/api/config/${path}`)
        configs.value[path] = config
      }
      catch (err) {
        console.error(err)
        configs.value[path] = null
      }
    }

    return configs.value[path] ?? null
  }

  async function getConfigValue(path: string, defaultValue: unknown = null) {
    const config = await fetchConfig(path)

    if (config === null) {
      return defaultValue
    }

    switch (config.type) {
      case 'json':
        return JSON.parse(config.value)
      case 'bool':
        return config.value === '0' ? false : true
      case 'number':
        return parseInt(config.value)
      case 'string':
      default:
        return config.value
    }
  }

  return { configs, fetchConfig, getConfigValue }
})
