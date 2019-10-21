import { cloudantConfig, authUsers } from '@setup/cloudant'
import { createDb, createDoc, replyDb, fetchDoc } from '@services/database'
import { setConfig, setOptions, setDoc } from '@utils/database'

import {
  CREATE_ALL_USERS_LOCAL_DB,
  CREATE_USER_LOCAL_DB,
  REPLY_USERS_DB,
  SYNC_USERS_DB,
  FETCH_USER,
  UPDATE_USER_LOCAL_DB,
  REMOVE_USER_LOCAL_DB
} from '@store/types/actions_types'
import { syncDb } from '../../../../services/database/database'

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
        // Guardamos la base de datos en caché
        commit('SET_ALL_USERS_LOCAL_DB', allUsersDb)
        return allUsersDb
      })
      .catch(error => {
        console.log('CREATE_ALL_USER_LOCAL_DB error: ' + error)
      })
  },

  /**
   * Crea la base de datos local del usuario
   *
   * @param {Object} newUser  Datos del usuario
   */
  async [CREATE_USER_LOCAL_DB]({ getters, commit }, newUser) {
    console.log('estoy en CREATE_USER_LOCAL_DB')
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      const user = await setDoc(newUser)
      console.log('el user es: ' + JSON.stringify(user))
      // Recuperamos la base de datos de usuarios almacenada en caché
      const db = getters.USERS_LOCAL_DB
      // Creamos el documento del usuario
      await createDoc(db, user)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_USER_LOCAL_DB error: ' + error)
    }
  },

  /**
   * Replicamos la base de datos de usuarios para tenerla siempre actualizada
   *
   * @param {}
   */
  async [REPLY_USERS_DB]({ getters, commit, dispatch, rootGetters }) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      const userId = rootGetters['user/USER_ID']
      const allUsersDb = getters['USERS_LOCAL_DB']

      // TODO: convertir en función
      // Establecemos los parametros de la confguracion
      const config = setConfig()
      config._id = userId
      config.dbName = 'users'
      config.remote = cloudantConfig.url + '/' + config.dbName
      console.log('La configuración es: ' + JSON.stringify(config))

      // TODO: convertir en función
      // Establecemos las opciones
      const options = setOptions()
      options.auth.username = authUsers.key
      options.auth.password = authUsers.password
      options.doc_ids.push(userId)
      console.log('Las opciones son: ' + JSON.stringify(options))

      // Replicamos y sincronizamos la base de datos
      await replyDb(allUsersDb, config, options)
        .then(response => {
          if (status === 'onChange') {
            console.log('La réplica del USERS ha cambiado')
            // dispatch('FETCH_USER')
          } else if (status === 'onComplete') {
            console.log('La réplica del USERS se ha completado')
            // const remote = config.remote
            // dispatch('SYNC_USERS_DB', allUsersDb, remote, options)
          } else {
            console.log('La réplisca o está pausada o denegada o hay un error')
          }
        })
        .catch(error => {
          console.log('REPLY_USERS_DB error: ' + error)
        })
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('REPLY_USERS_DB error: ' + error)
    }
  },

  // .on('change', info => {
  //   dispatch('FETCH_USER')
  //   console.log('reply is changed: ' + JSON.stringify(info))
  // })
  // .on('complete', info => {
  //   console.log('reply is completed: ' + JSON.stringify(info))
  //   const remote = config.remote
  //   dispatch('SYNC_USERS_DB', allUsersDb, remote, options)
  // })
  // .on('paused', err => {
  //   console.log('reply is paused: ' + JSON.stringify(err))
  // })
  // .on('active', () => {
  //   console.log('reply is working')
  // })
  // .on('denied', err => {
  //   console.log('reply denied: ' + JSON.stringify(err))
  // })
  // .on('error', err => {
  //   console.log('peply error: ' + JSON.stringify(err))
  // })

  /**
   * Replicamos la base de datos de usuarios para tenerla siempre actualizada
   *
   * @param {}
   */
  async [SYNC_USERS_DB]({ commit, dispatch }, db, remote, options) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      await syncDb(db, remote, options)
        .on('change', info => {
          console.log('La sync ha cambiado: ' + JSON.stringify(info))
          dispatch('FETCH_USER')
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
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('REPLY_USERS_DB error: ' + error)
    }
  },

  /**
   * Recuperamos los datos del usuario de la base de datos local
   *
   * @param {}
   */
  async [FETCH_USER]({ getters, commit, __, rootGetters }) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    const userId = rootGetters['user/USER_ID']
    const allUsersDb = getters['USERS_LOCAL_DB']
    try {
      const user = await fetchDoc(allUsersDb, userId)
      // Guardamos los datos del usuario en caché
      commit('user/SET_USER', user, { root: true })
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('FETCH_USER error: ' + error)
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
   * TODO: Revisarlo todo
   * Elimina el usuario de la base de datos local
   */
  [REMOVE_USER_LOCAL_DB]: ({ getters }, user) => {
    const usersLocalDb = getters.USERS_LOCAL_DB
    usersLocalDb.deleteDatabase(user)
  }
}
