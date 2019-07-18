import { cloudantConfig, authUser } from '@setup/cloudant'
import { userObject } from '@utils/database/samples'

import {
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

export default {
  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  async [CREATE_USER_LOCAL_DB]({ state, commit }, newUser) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    console.log('estoy en CREATE_USER_LOCAL_DB')
    console.log('el _id del usuario es: ' + newUser.id)

    const config = {}

    config.nameDb = 'users'
    config.apiKey = authUser.key
    config.apiPassword = authUser.password
    config.remote = cloudantConfig.url + '/' + config.nameDb

    // Creamos la base de datos local de los usuarios
    commit('SET_LOCAL_DB', config)

    const usersLocalDb = state.usersLocalDb

    // Clonamos el objeto base para construir nuestro documento
    const user = JSON.parse(JSON.stringify(userObject))

    if (usersLocalDb) {
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
      await usersLocalDb
        .put(user)
        .then(data => {
          // Comprobamos que existe la lista de usuarios - solo en desarrollo
          console.log('Base de datos local creada')
          user._rev = data.rev
          usersLocalDb.info().then(info => {
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
   *
   * @param {Object} updateUser  Actualiza el usuario de la base de datos local
   */
  // TODO: UTILIZAR USER/user - Revisar
  [UPDATE_USER_LOCAL_DB]: ({ state }, updateUser) => {
    const usersLocalDb = state.usersLocalDb
    usersLocalDb.update({
      name: updateUser.name,
      location: updateUser.location
    })
  },

  /**
   * TODO: Revisarlo todo
   * Recupera los datos del usuario de la base de datos local
   *
   * @param {Object} data Dato del usuario solicitado
   * @returns {String} Devuelve el dato del usuario solicitado
   */
  [GET_USER_DATA_LOCAL_DB]: ({ state }, user) => {
    const usersLocalDb = state.usersLocalDb
    return usersLocalDb.get(user)
  },

  /**
   * TODO: Revisarlo todo
   * Elimina el usuario de la base de datos local
   */
  [REMOVE_USER_LOCAL_DB]: ({ state }, user) => {
    const usersLocalDb = state.usersLocalDb
    usersLocalDb.deleteDatabase(user)
  }
}
