import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

export type RelayProps<Props = Record<string, unknown>> = {
  readonly relayRecords?: RecordMap
} & Props
