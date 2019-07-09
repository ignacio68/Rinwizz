/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param dbName { string } - database name
 */
export function createDb(nameDb, apiKey, apiPassword, remoteDb) {
  const db = new PouchDB(nameDb)
  const userName = apiKey
  const password = apiPassword
  const remote = remoteDb

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
