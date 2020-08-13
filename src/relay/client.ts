import { RelayNetworkLayer } from 'react-relay-network-modern/node8'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'
import { cacheMiddleware, urlMiddleware } from '~/relay/middlewares'

let store, source

let storeEnvironment = null

const createEnvironment = (relayRecords: RecordMap): Environment => {
  if (!store) {
    source = new RecordSource(relayRecords)
    store = new Store(source)
  }
  if (storeEnvironment) return storeEnvironment

  storeEnvironment = new Environment({
    store,
    network: new RelayNetworkLayer([cacheMiddleware, urlMiddleware]),
  })

  return storeEnvironment
}

export default {
  createEnvironment,
}
