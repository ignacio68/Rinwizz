import PouchDB from 'pouchdb-browser'

/**
 * Create database
 *
 * @param nameDb { String } - nombre de la base de datos
 * @param config { Object } - parametros opcionales para crear la base de datos
 */
// export const createDb = (nameDb, options) =>
//   new Promise((resolve, reject) => {
//     const db = PouchDB(nameDb, options)
//     if (db) {
//       resolve(db)
//     } else {
//       reject('No se ha podido crear la db')
//     }
//   })
export const createDb = (nameDb, options) => {
  try {
    const db = PouchDB(nameDb, options)
    console.log('Creada la base de datos: ' + JSON.stringify(db))
    return db
  } catch {
    console.log('No se ha podido crear la db')
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
    // console.log('Remote es: ' + remote)
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
 * TODO: Evitar utilizar esta función
 */
export async function deleteLocalDb(db) {
  try {
    const response = await db.destroy()
    console.log('Local database destroy: ' + JSON.stringify(response))
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
  let response
  try {
    response = await db.put(doc)
    console.log('document create' + JSON.stringify(response))
    return response
  } catch (error) {
    console.log('createDoc error: ' + error)
  }
}

/**
 * TODO: Revisar
 * Update a document
 * @param db { String } - local database
 * @param docId { String } - document id
 * @param data { Object } - data to update
 */
export function updateDoc(db, docId, data) {
  db.get(docId)
    .then(doc => {
      data._rev = doc._rev
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
 * Fetch a document - Async
 * @param db { String } - local database name
 * @param docId { String } - document id
 */
export function fetchDoc(db, docId) {
  console.log('Estoy en fetchDoc')
  try {
    const doc = db.get(docId)
    console.log('documento recuperado: ' + JSON.stringify(doc))
    return doc
  } catch (error) {
    console.log('fetchDoc error: ' + error)
  }
}

// /**
//  * Fetch a document - Promesa
//  * @param db { String } - local database name
//  * @param docId { String } - document id
//  */
// export const fetchDoc = (db, docId) =>
//   new Promise((resolve, reject) => {
//     console.log('Estoy en fetchDoc')
//     db.get(docId)
//       .then(doc => {
//         console.log('recuperado el usuario: ' + JSON.stringify(doc))
//         resolve(doc)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })

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
      console.log('Documento eliminado' + JSON.stringify(result))
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
    const docs = await db.allDocs(options)
    console.log(
      'Todos los documentos han sido recuperados' + JSON.stringify(docs)
    )
    return docs
  } catch (error) {
    console.log('fetchAllDocs error: ' + error)
  }
}
