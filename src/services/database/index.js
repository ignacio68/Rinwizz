/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param nameDb { string } - database name
 */
export function createDb(config) {
  const db = new PouchDB(config.nameDb)
  const userName = config.apiKey
  const password = config.apiPassword
  const remote = config.remoteDb

  let options = {
    live: true,
    retry: true,
    continuous: true,
    auth: {
      username: userName,
      password: password
    }
  }
  db.sync(remote, options)
  return db
}
