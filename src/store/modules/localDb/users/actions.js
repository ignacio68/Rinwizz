import { createDb, createDoc, replyDb } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'
import { userSample, configSample, optionsSample } from '@utils/database'

import {
  CREATE_ALL_USERS_LOCAL_DB,
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

export default {
  /**
   *  Crea la base de datos de todos los usuarios
   *
   * @param {}
   */
  [CREATE_ALL_USERS_LOCAL_DB]: ({ commit }) => {
    console.log('estoy en CREATE_ALL_USER_LOCAL_DB')
    createDb('users', { auto_compaction: true })
      .then(allUsersDb => {
        commit('SET_ALL_USERS_LOCAL_DB', allUsersDb)
        // return allUsersDb
      })
      .catch(error => {
        console.log('CREATE_ALL_USER_LOCAL_DB error es:' + error)
      })
  },

  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  async [CREATE_USER_LOCAL_DB]({ state, getters, commit }, newUser) {
    console.log('estoy en CREATE_USER_LOCAL_DB')
    console.log('el _id del usuario es: ' + newUser._id)

    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      const user = JSON.parse(JSON.stringify(userSample))
      // user._id = newUser._id
      // user.email = newUser.email
      // user.name = newUser.name
      // user.phone = newUser.phone
      // user.avatar = newUser.avatar
      // user.providerId = newUser.providerId
      // user.creationDate = newUser.creationDate
      // user.lastSignInDate = newUser.lastSignInDate
      // user.isAnonymous = newUser.isAnonymous
      // user.isVerified = newUser.isVerified
      for (let key in user) {
        user[key] = newUser[key]
      }
      console.log('el user es: ' + JSON.stringify(user))

      // await commit('user/SET_USER', user, { root: true })

      // Recuperamos la base de datos de usuarios almacenada en caché
      const db = await getters.USERS_LOCAL_DB
      // Creamos el documento del usuario
      await createDoc(db, user)
      // // Establecemos la configuración
      // const config = JSON.parse(JSON.stringify(configSample))
      // config._id = user._id
      // config.dbName = 'users'
      // config.remote = cloudantConfig.url + '/' + config.dbName
      // console.log('La configuración es: ' + JSON.stringify(config))

      // // Establecemos las opciones
      // const options = JSON.parse(JSON.stringify(optionsSample))
      // options.auth.username = authUsers.key
      // options.auth.password = authUsers.password
      // options.doc_ids.push(user._id)
      // console.log('Las opciones son: ' + JSON.stringify(options))

      // // Replicamos y sincronizamos la base de datos
      // await replyDb(db, config, options)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('Ha habido un error en CREATE_USER_LOCAL_DB: ' + error)
    }
  },

  /**
   *
   * @param {Object} updateUser  Actualiza el usuario de la base de datos local
   */
  // TODO: UTILIZAR USER/user - Revisar
  [UPDATE_USER_LOCAL_DB]: ({ getters }, updateUser) => {
    const usersLocalDb = getters.USERS_LOCAL_DB
    usersLocalDb.update({
      name: updateUser.name,
      location: updateUser.location
    })
  },

  /**
   * TODO: Revisarlo todo, hacerlo desde el getter
   * Recupera los datos del usuario de la base de datos local
   *
   * @param {Object} data Dato del usuario solicitado
   * @returns {String} Devuelve el dato del usuario solicitado
   */
  [GET_USER_DATA_LOCAL_DB]: ({ getters }, user) => {
    const usersLocalDb = getters.USERS_LOCAL_DB
    return usersLocalDb.get(user)
  },

  /**
   * TODO: Revisarlo todo
   * Elimina el usuario de la base de datos local
   */
  [REMOVE_USER_LOCAL_DB]: ({ getters }, user) => {
    const usersLocalDb = getters.USERS_LOCAL_DB
    usersLocalDb.deleteDatabase(user)
  }
}
