/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param config { Object } - parametros necesarios para crear la base de datos
 *
 * TODO: hacer primero local y luego sincronizar con la del servidor
 */
export function createDb(config) {
  const db = new PouchDB(config.nameDb)
  const userName = config.apiKey
  const password = config.apiPassword
  const remote = config.remoteDb

  const options = {
    live: true,
    retry: true,
    continuous: true,
    auth: {
      username: userName,
      password: password
    }
  }

  db.replicate
    .from(remote)
    .on('complete', function(info) {
      db.sync(remote, options)
        .on('change', function(info) {
          console.log('La sync ha cambiado: ' + info)
        })
        .on('complete', function(info) {
          console.log('La sync se ha completado: ' + info)
        })
        .on('paused', function(err) {
          console.log('La sync está pausada: ' + err)
        })
        .on('active', function() {
          console.log('La sync está trabajando')
        })
        .on('denied', function(err) {
          console.log('Se ha denegado la sync: ' + err)
        })
        .on('error', function(err) {
          console.log('Hay un error en la sync: ' + err)
        })
    })
    .on('error', function(err) {
      console.log('Ha habido un error en replicate: ' + err)
    })
}

/**
 * Delete local database
 * @param db { String } - local database name
 *
 * TODO: No utilizar hasta no separar la base local de la del servidor
 */
export function deleteLocalDb(db) {
  db.destroy()
    .then(response => {
      console.log('Local database destroy')
    })
    .catch(function(err) {
      console.log(err)
    })
}

/**
 * Create a document
 * @param db { String } - local database name
 * @param { String } doc - new document
 */
export function createDoc(db, doc) {
  db.put(doc)
    .then(response => {
      // Comprobamos que existe la lista de usuarios - solo en desarrollo
      console.log('document create')
      doc._rev = response.rev
      db.info().then(info => {
        console.log(info)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

/**
 * Update a document
 * @param db { String } - local database name
 * @param docId { String } - document id
 * @param { Object } data - data to update
 */
export function updateDoc(db, docId, data) {
  db.get(docId)
    .then(doc => {
      data._rev = doc._rev
      return db.put(data)
    })
    .then(response => {
      console.log('document updated')
      db.info().then(info => {
        console.log(info)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

/**
 * Fetch a docuemnt
 * @param db { String } - local database name
 * @param docId { String } - document id
 */
export function fetchDoc(db, docId) {
  db.get(docId)
    .then(doc => {
      console.log('document fetched')
      db.info().then(info => {
        console.log(info)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

/**
 * Delete document
 * @param db { String } - local database name
 * @param docId { String } - document id
 */
export function deleteDoc(db, docId) {
  db.get(docId)
    .then(doc => {
      doc._deleted = true
      return db.put(doc._deleted)
    })
    .then(result => {
      console.log('Documento eliminado')
    })
    .catch(err => {
      console.log(err)
    })
}
