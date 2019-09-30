/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

// TODO: ¡¡REPASAR TODO URGENTEMENTE!!

/**
 * Create database
 * @param config { Object } - parametros necesarios para crear la base de datos
 *
 * TODO: separar la réplica y la sincronización
 */
export function createDb(nameDb) {
  console.log('Estoy en createDb')
  const db = new PouchDB(nameDb, { auto_compaction: true })
  if (db) {
    console.log('SI existe db')
    console.log(JSON.stringify(db))
    return db
  } else {
    console.log('NO existe db')
  }
}

/**
 * Replicate and sync with the remote dataBase
 * @param remote { String } - remote database URL
 * @param options { Object }
 */
export function replyDb(db, config, options) {
  const remote = config.remote
  console.log('Remote es: ' + remote)
  db.replicate
    .from(remote, { doc_ids: options.doc_ids })
    .on('change', info => {
      console.log('La reply ha cambiado: ' + JSON.stringify(info))
    })
    .on('complete', info => {
      console.log('La reply se ha completado: ' + JSON.stringify(info))
      db.sync(remote, options)
        .on('change', info => {
          console.log('La sync ha cambiado: ' + JSON.stringify(info))
        })
        .on('complete', info => {
          console.log('La sync se ha completado: ' + JSON.stringify(info))
        })
        .on('paused', err => {
          console.log('La sync está pausada: ' + JSON.stringify(err))
        })
        .on('active', () => {
          console.log('La sync está trabajando')
        })
        .on('denied', err => {
          console.log('Se ha denegado la sync: ' + JSON.stringify(err))
        })
        .on('error', err => {
          console.log('Hay un error en la sync: ' + JSON.stringify(err))
        })
    })
    .on('paused', err => {
      console.log('La reply está pausada: ' + JSON.stringify(err))
    })
    .on('active', () => {
      console.log('La reply está trabajando')
    })
    .on('denied', err => {
      console.log('Se ha denegado la reply: ' + JSON.stringify(err))
    })
    .on('error', err => {
      console.log('Hay un error en la reply: ' + JSON.stringify(err))
    })
}

/**
 * Delete local database
 * @param db { String } - local database name
 *
 * TODO: No utilizar hasta no separar la base local de la del servidor
 * TODO: Evitar utilizar esta función
 */
export function deleteLocalDb(db) {
  db.destroy()
    .then(response => {
      console.log('Local database destroy')
      console.log(JSON.stringify(response))
    })
    .catch(err => {
      console.log('deleteLocalDb error: ' + err)
    })
}

/**
 * Create a document
 * @param db { String } - local database name
 * @param doc { String } - new document
 */
export function createDoc(db, doc) {
  console.log('Estoy en createDoc')
  db.put(doc)
    .then(response => {
      // Comprobamos que existe la lista de usuarios - solo en desarrollo
      console.log('document create')
      console.log(JSON.stringify(response))
    })
    .catch(err => {
      console.log('createDoc error: ' + err)
    })
}

/**
 * TODO: Repasar
 * Update a document
 * @param db { String } - local database name
 * @param docId { String } - document id
 * @param data { Object } - data to update
 */
export function updateDoc(db, docId, data) {
  db.get(docId)
    .then(doc => {
      data._rev = doc._rev
      return db.put(data)
    })
    .then(response => {
      console.log('document updated')
      console.log(JSON.stringify(response))
    })
    .catch(err => {
      console.log('updateDoc error: ' + err)
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
      console.log('documento recuperado: ' + JSON.stringify(doc))
    })
    .catch(err => {
      console.log('fetchDoc error: ' + err)
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
      return db.put(doc)
    })
    .then(result => {
      console.log('Documento eliminado')
      console.log(JSON.stringify(result))
    })
    .catch(err => {
      console.log('deleteDoc error: ' + err)
    })
}

/**
 * Fetch a batch of documents
 *
 * @param db { String } - local database name
 * @param options { Array } - options
 */
export function fetchDocs(db, options) {
  db.allDocs(options)
    .then(results => {
      console.log('Todos los documentos han sido recuperados')
      console.log(JSON.stringify(results))
    })
    .catch(err => {
      console.log('fetchDocs error: ' + err)
    })
}

/**
 * Listen to database changes
 */
