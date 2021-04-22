import RelaySSR from 'react-relay-network-modern-ssr/node8/server'
import { Environment } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

export const { initEnvironment, createEnvironment } = (typeof window === 'undefined'
  ? require('./server')
  : require('./client')
).default as {
  initEnvironment: () => { environment: Environment; relaySSR: RelaySSR }
  createEnvironment: (relayRecords?: RecordMap) => Environment
}
