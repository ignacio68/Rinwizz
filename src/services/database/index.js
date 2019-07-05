/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param dbName { string } - database name
 */
export function createDb(nameDb) {
  const db = new PouchDB(nameDb)
  return db
}

// export const alertsList = createDb('alerts')
// export const usersList = createDb('users')

// const alertsList = new PouchDB('alerts')
// const usersList = new PouchDB('users')
