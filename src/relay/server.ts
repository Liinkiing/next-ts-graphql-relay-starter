import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern/node8'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

const initEnvironment = () => {
  const source = new RecordSource()
  const store = new Store(source)

  return {
    environment: new Environment({
      store,
      network: new RelayNetworkLayer([
        urlMiddleware({
          url: _ => process.env.NEXT_PUBLIC_GRAPHQL_API,
        }),
      ]),
    }),
  }
}

const createEnvironment = (records: RecordMap) => {
  const source = new RecordSource(records)
  const store = new Store(source)

  return new Environment({
    store,
    network: new RelayNetworkLayer([
      urlMiddleware({
        url: _ => process.env.NEXT_PUBLIC_GRAPHQL_API,
      }),
    ]),
  })
}

export default {
  initEnvironment,
  createEnvironment,
}
