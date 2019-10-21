import {
  createDb,
  createDoc,
  replyDb,
  syncDb,
  fetchAllDocs
} from '@services/database'
import {
  setConfig,
  setAlertsOptions,
  setFetchBatchOptions
} from '@utils/database'

import {
  CREATE_ALERTS_LOCAL_DB,
  REPLY_ALERTS_DB,
  SYNC_ALERTS_DB,
  PUT_ALERT_LOCAL_DB,
  GET_ALERTS
} from '@store/types/actions_types'

/**
 * Creamos la bas ede datos local de las alertas
 */
export default {
  [CREATE_ALERTS_LOCAL_DB]: ({ commit, dispatch }) => {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })

    console.log('CREATE_ALERTS_LOCAL_DB')
    // Creamos la base de datos local
    try {
      createDb('alerts', { auto_compaction: true })
        .then(alertsDb => {
          console.log('alertsDb es: ' + JSON.stringify(alertsDb))
          // creamos la base de datos en caché
          commit('SET_ALL_ALERTS_LOCAL_DB', alertsDb)
        })
        .then(() => {
          // replicamos la base de datos remota
          dispatch('REPLY_ALERTS_DB')
        })
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_ALERTS_LOCAL_DB error: ' + error)
    }
  },

  /**
   * Replicamos la base de datos de las alertas
   *
   * @param {}
   */
  async [REPLY_ALERTS_DB]({ getters, commit, dispatch, rootGetters }) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      const AlertsDb = getters.GET_ALERTS_LOCAL_DB
      // TODO: utilizar cuando no se utilice FAke
      // const fetchFollowings = rootGetters['user/USER_FOLLOWING']

      // Establecemos la configuración
      const config = setConfig(null, 'alerts')
      // '4rOdkM3mVmW1rTM3nttoIbjMldc2:1570465573591-4rOdkM3mVmW1rTM3nttoIbjMldc2',

      // Establecemos las opciones
      const options = setAlertsOptions()
      options.doc_ids = null

      const replyData = { db: AlertsDb, config: config, options: options }
      // Replicamos y sincronizamos la base de datos
      replyDb(replyData).then(() => {
        console.log('ReplyDb realizada')
        const syncData = replyData
        dispatch('SYNC_ALERTS_DB', { syncData })
      })
    } catch (error) {
      console.log('REPLY_ALERTS_DB error: ' + error)
      commit('shared/SET_ERROR', null, { root: true })
    }
  },

  /**
   * Sincronizamos la base de datos
   *
   * @param {Object} syncData
   */
  async [SYNC_ALERTS_DB]({ commit, dispatch }, { syncData }) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    console.log('syncData: ' + syncData)
    try {
      console.log('SYNC_ALERTS_DB preparada')
      const sync = await syncDb(syncData)
      // .then(sync => {
      //   console.log('SYNC_USERS_DB realizada: ' + JSON.stringify(sync))
      //   // dispatch('FETCH_USER')
      console.log('SYNC_USERS_DB realizada: ' + JSON.stringify(sync))
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('SYNC_USERS_DB error: ' + error)
    }
  },

  /**
   * Creamos la alerta y la colocamos en la base de datos local
   * @param {object} newAlert - Parametros de la alerta
   */
  async [PUT_ALERT_LOCAL_DB]({ getters, commit }, newAlert) {
    console.log('Estoy en PUT_ALERT_LOCAL_DB')
    console.log('el _id del usuario es: ' + newAlert._id)

    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      // TODO: get alert para añadir a la base de datos local de alertas

      // Recuperamos la base de datos de usuarios almacenada en caché
      const db = await getters.GET_ALERTS_LOCAL_DB
      // console.log('La base de datos es: ' + JSON.stringify(db))
      // Creamos el documento del usuario
      await createDoc(db, newAlert)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('PUT_ALERT_LOCAL_DB error: ' + error)
    }
  },

  /**
   * Recuperamos las alertas de la base de datos local
   *
   */
  async [GET_ALERTS]({ getters, commit }) {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    // Recuperamos la base de datos de alertas almacenada en caché
    const alertsDb = getters.GET_ALERTS_LOCAL_DB
    // console.log('alerts db es: ' + JSON.stringify(db))
    try {
      console.log('action GET_ALERTS')
      // Establecemos la configuración -- Recuperarla como parametro
      const options = setFetchBatchOptions()
      // límite de alertas a recuperar -- PRUEBA
      options.limits = 10
      // Recuperamos todas las alertas de la base de datos
      const alerts = await fetchAllDocs(alertsDb, options)
      // console.log('Las alertas son: ' + alerts)
      // commit('alerts/SET_LOADED_ALERTS', alerts, { root: true })
      return alerts
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('GET_ALERTS error: ' + error)
    }
  }
}
