import PouchDB from 'pouchdb-browser'

import {
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_EMAIL_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

// const db = new PouchDB('Rinwizz')

export default {
  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  [CREATE_USER_LOCAL_DB]: newUser => {
    console.log('estoy en createLocalUserDb')
    // const newUserJSON = JSON.stringify(newUser)
    // Repasar, la solución no es muy convincente
    // commit ('toJSON', newUser)
    // db.put(this.dataToJSON)
    db.put({
      // _id: new Date().toISOString(),
      _id: '"' + newUser._id + '"',
      userData: {
        email: '"' + newUser.email + '"',
        name: '"' + newUser.name + '"'
      }
    })
      .then(response => {
        console.log('La info de la base de datos local es: ' + response)
      })
      .catch(error => {
        // TODO: Revisar la gestión de errores
        console.log('El error en PouchDb es: ' + error)
        console.log(newUser)
      })
  },
  /**
   * Actualiza el email del usuario en la base de datos local
   *
   * @param {String} userEmail Email del usuario
   */
  // REVISAR -- UTILIZAR USER/user
  [UPDATE_USER_EMAIL_LOCAL_DB]: userEmail => {
    this.userData.update({
      email: userEmail
    })
  },
  /**
   *
   * @param {Object} updateUser  Actualiza el usuario de la base de datos local
   */
  // REVISAR -- UTILIZAR USER/user
  [UPDATE_USER_LOCAL_DB]: updateUser => {
    this.userData.update({
      name: updateUser.name,
      location: updateUser.location
    })
  },

  /**
   * Recupera los datos del usuario de la base de datos local
   *
   * @param {Object} data Dato del usuario solicitado
   * @returns {String} Devuelve el dato del usuario solicitado
   */
  [GET_USER_DATA_LOCAL_DB]: data => {
    // let userData
    // userData = "'" + data + "'"
    return db.get(data)
  },

  /**
   * Elimina el usuario de la base de datos local
   */
  [REMOVE_USER_LOCAL_DB]: user => {
    db.deleteDatabase(user)
  }
}
