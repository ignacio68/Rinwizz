import { createDb, createDoc, replyDb, fetchAllDocs } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'
import {
  configSample,
  optionsSample,
  optionsFetchBatchDocsSample
} from '@utils/database'

import {
  CREATE_ALERTS_LOCAL_DB,
  PUT_ALERT_LOCAL_DB,
  GET_ALERTS
} from '@store/types/actions_types'

/**
 * Creamos la bas ede datos local de las alertas
 */
export default {
  async [CREATE_ALERTS_LOCAL_DB]({ commit }) {
    console.log('CREATE_ALERTS_LOCAL_DB')
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      // Creamos la base de datos local
      const alertsDb = await createDb('alerts')
      console.log('alertsDb es: ' + JSON.stringify(alertsDb))

      // creamos la base de datos en caché
      commit('SET_ALERTS_LOCAL_DB', alertsDb)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_ULERTS_LOCAL_DB error: ' + error)
    }
  },

  /**
   * Creamos la alerta y la colocamos en la base de datos local
   * @param {object} newAlert - Parametros de la alerta
   */
  async [PUT_ALERT_LOCAL_DB]({ getters, commit }, newAlert) {
    console.log('CREATE_USER_ALERT_LOCAL_DB')
    console.log('el _id del usuario es: ' + newAlert._id)

    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      // TODO: get alert para añadir a la base de datos local de alertas

      // Recuperamos la base de datos de usuarios almacenada en caché
      const db = await getters.ALERTS_LOCAL_DB
      // console.log('La base de datos es: ' + JSON.stringify(db))
      // Creamos el documento del usuario
      await createDoc(db, newAlert)
      // Establecemos la configuración
      const config = JSON.parse(JSON.stringify(configSample))
      config._id = alert._id
      config.dbName = 'alerts'
      config.remote = cloudantConfig.url + '/' + config.dbName
      console.log('La configuración es: ' + JSON.stringify(config))

      // Establecemos las opciones
      const options = JSON.parse(JSON.stringify(optionsSample))
      options.auth.username = authUsers.key
      options.auth.password = authUsers.password
      options.doc_ids.push(alert._id)
      console.log('Las opciones son: ' + JSON.stringify(options))

      // Replicamos y sincronizamos la base de datos
      await replyDb(db, config, options)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_USER_ALERT_LOCAL_DB error: ' + error)
    }
  },

  /**
   * Recuperamos las alertas de la base d e datos local
   *
   */
  async [GET_ALERTS]({ getters, commit }) {
    console.log('CREATE_USER_ALERT_LOCAL_DB')
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    try {
      // Recuperamos la base de datos de usuarios almacenada en caché
      const db = await getters.ALERTS_LOCAL_DB

      // Establecemos la configuración -- Recuperarla como parametro
      const options = JSON.parse(JSON.stringify(optionsFetchBatchDocsSample))
      // límite de alertas a recuperar -- PRUEBA
      options.limits = 10

      // Recuperamos todas las alertas de la base de datos
      const alerts = await fetchAllDocs(db, options)
      return alerts
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('GET_ALERTS error: ' + error)
    }
  }
}
