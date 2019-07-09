import { cloudantConfig, authUser } from '@setup/cloudant'
import { createDb } from '@services/database/index'
import { userObject } from '@utils/database/samples'

import {
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_EMAIL_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

// Creamos las bases de datos necesarias: usuarios y alertas
const nameDb = 'users'
const apiKey = authUser.key
const apiPassword = authUser.password
const remote = cloudantConfig.url + '/' + nameDb

const usersList = createDb(nameDb, apiKey, apiPassword, remote)

const user = JSON.parse(JSON.stringify(userObject))

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
    if (usersList) {
      user._id = newUser.id
      user.email = newUser.email
      user.name = newUser.name
      user.phone = newUser.phone
      user.avatar = newUser.avatar
      user.providerId = newUser.providerId
      user.creationDate = newUser.creationDate
      user.lastSignInDate = newUser.lastSignInDate
      user.isAnonymous = newUser.isAnonymous
      user.isVerified = newUser.isVerified
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
    usersList.update({
      email: userEmail
    })
  },
  /**
   *
   * @param {Object} updateUser  Actualiza el usuario de la base de datos local
   */
  // REVISAR -- UTILIZAR USER/user
  [UPDATE_USER_LOCAL_DB]: updateUser => {
    usersList.update({
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
  [GET_USER_DATA_LOCAL_DB]: user => {
    // let userData
    // userData = "'" + data + "'"
    return usersList.get(user)
  },

  /**
   * Elimina el usuario de la base de datos local
   */
  [REMOVE_USER_LOCAL_DB]: user => {
    usersList.deleteDatabase(user)
  }
}
