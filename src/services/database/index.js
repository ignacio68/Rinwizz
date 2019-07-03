/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param dbName { string } - database name
 */
export const createDb = nameDb => {
  const db = new PouchDB(nameDb)
  return db
}

const alertsList = new PouchDB('alerts')
const usersList = new PouchDB('users')
