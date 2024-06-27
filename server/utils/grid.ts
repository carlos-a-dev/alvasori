import type { H3Event, EventHandlerRequest } from 'h3'
import { getQuery } from 'h3'

export const parseQuery = <T extends object>(event: H3Event<EventHandlerRequest>, baseArgs: T = {} as T) => {
  const query: string = getQuery(event).q as string
  if (query) {
    const q = JSON.parse(query)
    Object.assign(baseArgs, q)
  }

  return baseArgs
}
