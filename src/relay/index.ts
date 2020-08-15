import { Environment } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

export const { initEnvironment, createEnvironment } = (typeof window === 'undefined'
  ? require('./server')
  : require('./client')
).default as {
  initEnvironment: () => { environment: Environment }
  createEnvironment: (relayRecords?: RecordMap) => Environment
}
