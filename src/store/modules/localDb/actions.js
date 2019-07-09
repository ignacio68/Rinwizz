// import PouchDB from 'pouchdb-browser'
import { createDb } from '@services/database/index'
import { userSample } from '@utils/database/samples'

import {
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_EMAIL_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

// const db = new PouchDB('Rinwizz')

// Creamos las bases de datos necesarias: usuarios y alertas
const usersList = createDb('users')
const user = JSON.parse(JSON.stringify(userSample))

export default {
  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  async [CREATE_USER_LOCAL_DB]({ commit }, newUser) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    console.log('estoy en CREATE_USER_LOCAL_DB')
    console.log('el _id del usuario es: ' + newUser.id)
    console.log('El email de usuario es: ' + newUser.email)
    if (newUser) {
      user._id = newUser.id
      user.email = newUser.email
      user.name = newUser.name
      await usersList
        .put(user)
        .then(data => {
          // Comprobamos que existe la lista de usuarios - solo en desarrollo
          console.log('Base de datos local creada')
          user._rev = data.rev
          usersList.info().then(info => {
            console.log(info)
          })
        })
        .catch(error => {
          // TODO: Revisar la gestión de errores
          commit('shared/SET_ERROR', null, { root: true })
          console.log('El error en PouchDb es: ' + error)
          console.log(newUser)
        })
    } else {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('No existe el usuario')
    }
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
