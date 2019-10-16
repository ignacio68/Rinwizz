import { createDb, createDoc, replyDb, fetchAllDocs } from '@services/database'
import { cloudantConfig, authAlerts } from '@setup/cloudant'
import { setConfig, setOptions, setFetchBatchOptions } from '@utils/database'

import {
  CREATE_ALERTS_LOCAL_DB,
  PUT_ALERT_LOCAL_DB,
  GET_ALERTS
} from '@store/types/actions_types'

/**
 * Creamos la bas ede datos local de las alertas
 */
export default {
  [CREATE_ALERTS_LOCAL_DB]: ({ commit }) => {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })

    console.log('CREATE_ALERTS_LOCAL_DB')
    // Creamos la base de datos local
    createDb('alerts', { auto_compaction: true })
      .then(alertsDb => {
        console.log('alertsDb es: ' + JSON.stringify(alertsDb))

        // creamos la base de datos en caché
        commit('SET_ALL_ALERTS_LOCAL_DB', alertsDb)

        // replicamos la base de datos
        // Establecemos la configuración
        const config = setConfig()
        // config._id = newAlert._id
        config.dbName = 'alerts'
        config.remote = cloudantConfig.url + '/' + config.dbName

        // Establecemos las opciones
        const options = setOptions()
        options.auth.username = authAlerts.key
        options.auth.password = authAlerts.password
        // options.doc_ids.push(newAlert._id)

        // Replicamos y sincronizamos la base de datos
        replyDb(alertsDb, config, options)
      })

      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log('CREATE_ALERTS_LOCAL_DB error: ' + error)
      })
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
    const db = getters.GET_ALERTS_LOCAL_DB
    // console.log('alerts db es: ' + JSON.stringify(db))
    try {
      console.log('action GET_ALERTS')
      // Establecemos la configuración -- Recuperarla como parametro
      const options = setFetchBatchOptions()
      // límite de alertas a recuperar -- PRUEBA
      options.limits = 10
      // Recuperamos todas las alertas de la base de datos
      const alerts = await fetchAllDocs(db, options)
      console.log('Las alertas son: ' + alerts)
      commit('alerts/SET_LOADED_ALERTS', alerts, { root: true })
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('GET_ALERTS error: ' + error)
    }
  }
}
