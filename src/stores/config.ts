import { getCssVar } from 'quasar'
import { defineStore } from 'pinia'
import { getRc, fetchAndActivate, getValue, getAll, isAppInitialized } from 'src/composables/firebase/use-remote-config'

const defaultConfig:{ [k: string]: string; } = {
  app_name: process.env.APP_NAME ?? 'Compay',
  logo_src: process.env.APP_LOGO ?? '',
  author: 'Carlos Alvarez',
  theme: JSON.stringify({
    primary: getCssVar('primary'),
    secondary: getCssVar('secondary'),
    accent: getCssVar('accent'),
    dark: getCssVar('dark'),
    'dark-page': getCssVar('dark-page'),
    positive: getCssVar('positive'),
    negative: getCssVar('negative'),
    info: getCssVar('info'),
    warning: getCssVar('warning')
  }),
  dark_mode: 'false',
  param_types: JSON.stringify({
    theme: 'object',
    param_types: 'object',
    dark_mode: 'boolean'
  })
}

let paramTypes = JSON.parse(defaultConfig.param_types)

function getParamTypes () {
  let myParamTypes = JSON.parse(defaultConfig.param_types)

  if (isAppInitialized()) {
    myParamTypes = Object.assign(paramTypes, JSON.parse(getValue(getRc(), 'param_types').asString()))
  }

  paramTypes = myParamTypes
  return paramTypes
}

function parseValue (code: string, value: string) {
  if (code === 'param_types') {
    return getParamTypes()
  }

  const type = paramTypes[code] ?? 'none'
  switch (type) {
    case 'boolean':
      return ['1', 'true', 't', 'yes', 'y', 'on'].indexOf(value.toLowerCase()) >= 0
    case 'number':
      return Number(value) || 0
    case 'object':
    case 'array':
      return JSON.parse(value)
    case 'string':
    default:
      return value
  }
}

function getConfig () {
  let params = defaultConfig
  if (isAppInitialized()) {
    const remoteConfig = getRc()
    remoteConfig.defaultConfig = defaultConfig
    params = Object.fromEntries(Object.entries(getAll(remoteConfig)).map(([code, value]) => [code, value.asString()]))
  }

  return Object.fromEntries(Object.entries(params).map(([code, value]) => [code, parseValue(code, value)]))
}

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      config: getConfig()
    }
  },
  actions: {
    async loadRemoteConfig () {
      const remoteConfig = getRc()
      await fetchAndActivate(remoteConfig)
      getParamTypes()
      this.$patch({ config: getConfig() })
    }
  }
})
