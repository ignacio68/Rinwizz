// import PouchDB from 'pouchdb-browser'
import { createDb } from '@services/database/index'

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
  async [CREATE_USER_LOCAL_DB](newUser) {
    console.log('estoy en CREATE_USER_LOCAL_DB')
    // Creamos las bases de datos necesarias: usuarios y alertas
    const usersList = await createDb('users')
    // FIXME: convertir los datos a JSON
    const userData = {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name
    }
    const userDataJSON = JSON.stringify(userData)
    console.log('La base de datos es: ' + userDataJSON)
    await usersList
      .put(userDataJSON)
      .then(response => {
        // Comprobamos que existe la lista de usuarios - solo en desarrollo
        console.log('Base de datos local creada')
        usersList.info().then(info => {
          console.log(info)
        })
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
