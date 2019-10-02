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
export async function createDb(nameDb) {
  console.log('Estoy en createDb')
  try {
    const db = new PouchDB(nameDb, { auto_compaction: true })
    console.log('SI existe db')
    // console.log(JSON.stringify(db))
    return db
  } catch (error) {
    console.log('createDb error: ' + error)
  }
}

/**
 * Replicate and sync with the remote dataBase
 * @param remote { String } - remote database URL
 * @param options { Object }
 */
export async function replyDb(db, config, options) {
  console.log('Estoy en replyDb')
  try {
    const remote = config.remote
    console.log('Remote es: ' + remote)
    await db.replicate
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
  } catch (error) {
    console.log('replyDb error: ' + error)
  }
}

/**
 * Delete local database
 * @param db { String } - local database name
 *
 * TODO: No utilizar hasta no separar la base local de la del servidor
 * TODO: Evitar utilizar esta función
 */
export async function deleteLocalDb(db) {
  try {
    const response = await db.destroy()
    console.log('Local database destroy')
    console.log(JSON.stringify(response))
  } catch (error) {
    console.log('deleteLocalDb error: ' + error)
  }
}

/**
 * Create a document
 * @param db { String } - local database name
 * @param doc { String } - new document
 */
export async function createDoc(db, doc) {
  console.log('Estoy en createDoc')
  try {
    const response = await db.put(doc)
    // Comprobamos que existe la lista de usuarios - solo en desarrollo
    console.log('document create')
    console.log(JSON.stringify(response))
  } catch (error) {
    console.log('createDoc error: ' + error)
  }
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
      // data._rev = doc._rev
      return db.put(data)
    })
    .then(() => {
      console.log('document updated')
      return db.get(docId)
    })
    .then(doc => {
      console.log(JSON.stringify(doc))
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
export async function fetchDoc(db, docId) {
  console.log('Estoy en fetchDoc')
  try {
    const doc = db.get(docId)
    console.log('documento recuperado: ' + JSON.stringify(doc))
    return doc
  } catch (error) {
    console.log('fetchDoc error: ' + error)
  }
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
export async function fetchAllDocs(db, options) {
  try {
    const results = await db.allDocs(options)
    console.log('Todos los documentos han sido recuperados')
    console.log(JSON.stringify(results))
  } catch (error) {
    console.log('fetchDocs error: ' + error)
  }
}

/**
 * Listen to database changes
 */
