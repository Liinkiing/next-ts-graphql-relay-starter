import { cacheMiddleware, RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern/node8'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

let store, source

let storeEnvironment = null

const createEnvironment = (records: RecordMap): Environment => {
  if (!store) {
    source = new RecordSource(records)
    store = new Store(source)
  }
  if (storeEnvironment) return storeEnvironment

  storeEnvironment = new Environment({
    store,
    network: new RelayNetworkLayer([
      cacheMiddleware({
        size: 100,
        ttl: 60 * 1000,
      }),
      urlMiddleware({
        url: _ => process.env.NEXT_PUBLIC_GRAPHQL_API,
      }),
    ]),
  })

  return storeEnvironment
}

export default {
  createEnvironment,
}
