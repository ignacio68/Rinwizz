import { createDoc, replyDb } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'
import { userSample, configSample, optionsSample } from '@utils/database'

import {
  CREATE_USER_LOCAL_DB,
  UPDATE_USER_LOCAL_DB,
  GET_USER_DATA_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'

export default {
  // TODO: ¡¡REPASAR TODO URGENTEMENTE!!

  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  async [CREATE_USER_LOCAL_DB]({ state, getters, commit }, newUser) {
    console.log('estoy en CREATE_USER_LOCAL_DB')
    console.log('el _id del usuario es: ' + newUser.id)

    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      console.log('Estoy en userLocalDb')
      const user = JSON.parse(JSON.stringify(userSample))
      if (user) {
        console.log('CREATE_USER_LOCAL_DB: existe el user')
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
        console.log('el user es: ' + JSON.stringify(user))

        // Recuperamos la base de datos de usuarios almacenada en caché
        const db = getters.USERS_LOCAL_DB

        // Creamos el documento del usuario
        await createDoc(db, user)
        // Establecemos la configuración
        const config = JSON.parse(JSON.stringify(configSample))
        config._id = user._id
        config.dbName = 'users'
        config.remote = cloudantConfig.url + '/' + config.dbName
        console.log('La configuración es: ' + JSON.stringify(config))

        // Establecemos las opciones
        const options = JSON.parse(JSON.stringify(optionsSample))
        options.auth.username = authUsers.key
        options.auth.password = authUsers.password
        options.doc_ids.push(user._id)
        console.log('Las opciones son: ' + JSON.stringify(options))

        // Replicamos y sincronizamos la base de datos
        await replyDb(db, config, options)
      } else {
        commit('shared/SET_ERROR', null, { root: true })
        console.log('error, no existe el usuario')
      }
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

/*************************/
// Establecemos la configuración para la sincronización de la base de datos
// const config = JSON.parse(JSON.stringify(configSample))
// config.dbName = 'users'
// // config.apiKey = authUsers.key
// // config.apiPassword = authUsers.password
// config.remote = cloudantConfig.url + '/' + config.nameDb

// // establecemos las opciones para la réplica y la sincronización de la base de datos
// const options = JSON.parse(JSON.stringify(optionsSample))
// options.doc_ids[0] = newUser.id
// options.auth.username = authUsers.key
// options.auth.password = authUsers.password
// const syncOptions = {
//   live: true,
//   retry: true,
//   continuous: true,
//   auth: {
//     username: authUsers.key,
//     password: authUsers.password
//   },
//   doc_ids: [newUser.id]
// filter: '_view',
// view: 'myview/userName'
// filter: 'app/by_user',
// query_params: { userId: config._id, location: 'Madrid' }
// }
// try {
// Creamos la base de datos local de los usuarios
// TODO: createDb devuelve una promesa

// const localDb = createDb(config)
// const localDb = getters('USERS_LOCAL_DB')
// replicateRemoteDb(config, options)
// syncDb(config, options)
// console.log('userLocalDb: ' + localDb)
// if (localDb) {
//   console.log('Estoy en userLocalDb')
// await commit('user/SET_USER', localDb, { root: true })
// state.usersLocalDb = localDb

//     const user = JSON.parse(JSON.stringify(userSample))

//     if (user) {
//       console.log('CREATE_USER_LOCAL_DB: existe el user')
//       user._id = newUser.id
//       user.email = newUser.email
//       user.name = newUser.name
//       user.phone = newUser.phone
//       user.avatar = newUser.avatar
//       user.providerId = newUser.providerId
//       user.creationDate = newUser.creationDate
//       user.lastSignInDate = newUser.lastSignInDate
//       user.isAnonymous = newUser.isAnonymous
//       user.isVerified = newUser.isVerified
//       console.log('el user es: ' + JSON.stringify(user))
//       localDb
//         .put(user)
//         .then(data => {
//           // Comprobamos que existe la lista de usuarios - solo en desarrollo
//           console.log('Base de datos local creada')
//           user._rev = data.rev
//           localDb.info().then(info => {
//             console.log(info)
//           })
//         })
//         .catch(error => {
//           // TODO: Revisar la gestión de errores
//           commit('shared/SET_ERROR', null, { root: true })
//           console.log('El error en PouchDb es: ' + error)
//           console.log(newUser)
//         })
//     } else {
//       commit('shared/SET_ERROR', null, { root: true })
//       console.log('No existe el usuario')
//     }
//   }
// } catch (error) {
//   commit('shared/SET_ERROR', null, { root: true })
//   console.log('Ha habido un error en SET_LOCAL_DB: ' + error)
// }