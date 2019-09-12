/**
 * Importing
 */
import PouchDB from 'pouchdb-browser'

/**
 * Create database
 * @param config { Object } - parametros necesarios para crear la base de datos
 *
 * TODO: separar la réplica y la sincronización
 */
export function createDb(config) {
  console.log('Estoy en createDb')
  const db = new PouchDB(config.nameDb, { auto_compaction: true })
  if (db) {
    console.log('SI existe db')
    console.log(JSON.stringify(config))
    console.log(JSON.stringify(db))
    const userId = config._id
    const userName = config.apiKey
    const password = config.apiPassword
    const remote = config.remote
    console.log('Remote es: ' + remote)

    const options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: userName,
        password: password
      },
      doc_ids: [userId],
      filter: '_view',
      view: 'myview/userName'
      // filter: 'app/by_user',
      // query_params: { userId: config._id, location: 'Madrid' }
    }

    db.replicate
      .from(remote, {
        // filter: 'app/by_user',
        // query_params: { userId: config._id, location: 'Madrid' }
        doc_ids: [userId]
      })
      .on('complete', info => {
        console.log('Replicate completado: ' + JSON.stringify(info))
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
      .on('error', function(err) {
        console.log('Ha habido un error en replicate: ' + err)
      })
    return db
  } else {
    console.log('NO existe db')
  }
}

/**
 * Replicate remote dataBase
 * @param remote { String } - remote database URL
 * @param options { Object }
 */
export function replicateRemoteDb(remote, db, options) {
  db.replicate
    .from(remote, options)
    .on('change', info => {
      console.log('La reply ha cambiado: ' + JSON.stringify(info))
    })
    .on('complete', info => {
      console.log('La reply se ha completado: ' + JSON.stringify(info))
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
 */
export function deleteLocalDb(db) {
  db.destroy()
    .then(response => {
      console.log('Local database destroy')
    })
    .catch(err => {
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
        console.log(JSON.stringify(info))
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
      return db.put(doc)
    })
    .then(result => {
      console.log('Documento eliminado')
    })
    .catch(err => {
      console.log(err)
    })
}