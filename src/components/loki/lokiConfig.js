import loki from '@lokidb/loki'
import indexedStorage from '@lokidb/indexed-storage'
import lokiPartitioningAdapter from '@lokidb/partitioning-adapter'

const db = new loki('rinwizz.db', {
  adapter: pa,
  env: 'CORDOVA',
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
  method: indStorage
}) 

// const idbAdapter = new LokiIndexedAdapter()
const pa = new lokiPartitioningAdapter()

const indStorage = new indexedStorage()

// const db = new loki('rinwizz.db')

const userData = db.addCollection('userData')

export { db, userData }
