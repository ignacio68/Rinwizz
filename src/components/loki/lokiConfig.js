import loki from '@lokidb/loki'

/* const db = new loki('rinwizz.db', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
  persistenceMethod: 'local-storage'
}) */

const db = new loki('rinwizz.db')

const userData = db.addCollection('userData')

export { db, userData }
