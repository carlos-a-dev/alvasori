import type { Config, Prisma } from '@prisma/client'

export async function getConfig(path: string, options: Partial<Prisma.ConfigFindUniqueArgs> = {}) {
  const prisma = getPrismaClient()

  return await prisma.config.findUnique(Object.assign({
    where: {
      path: path,
    },
  }, options))
}

export async function getConfigValue(path: string, defaultValue: unknown = null) {
  const config = await getConfig(path, {
    select: {
      value: true,
      type: true,
    },
  })

  if (config === null) {
    return defaultValue
  }

  switch (config.type) {
    case 'json':
      return JSON.parse(config.value)
    case 'bool':
      return config.value === '1' ? true : false
    case 'number':
      return parseInt(config.value)
    case 'string':
    default:
      return config.value
  }
}

export async function updateConfig(path: string, data: Partial<Config>) {
  const prisma = getPrismaClient()

  return await prisma.config.update({
    data: data,
    where: {
      path: path,
    },
  })
}
