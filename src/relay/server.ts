import { RelayNetworkLayer } from 'react-relay-network-modern/node8'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'
import { urlMiddleware } from '~/relay/middlewares'

const initEnvironment = () => {
  const source = new RecordSource()
  const store = new Store(source)

  return {
    environment: new Environment({
      store,
      network: new RelayNetworkLayer([urlMiddleware]),
    }),
  }
}

const createEnvironment = (relayRecords: RecordMap) => {
  const source = new RecordSource(relayRecords)
  const store = new Store(source)

  return new Environment({
    store,
    network: new RelayNetworkLayer([urlMiddleware]),
  })
}

export default {
  initEnvironment,
  createEnvironment,
}
