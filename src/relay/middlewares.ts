import {
  cacheMiddleware as relayCacheMiddleware,
  urlMiddleware as relayUrlMiddleware,
} from 'react-relay-network-modern/node8'

export const urlMiddleware = relayUrlMiddleware({
  url: _ => process.env.NEXT_PUBLIC_GRAPHQL_API,
})

export const cacheMiddleware = relayCacheMiddleware({
  size: 100,
  ttl: 60 * 1000 * 30, // 30 minutes
})
