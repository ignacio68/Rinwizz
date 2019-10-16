import { createDoc } from '@services/database'
import { setAlert } from '@utils/database'

import { CREATE_ALERT, LOAD_ALERTS } from '@store/types/actions_types'

export default {
  /**
   * Crea una alerta
   *
   * @param {Object} alertData - Datos de la alerta
   */
  async [CREATE_ALERT]({ _, commit, __, rootGetters }, alertData) {
    console.log('Estoy en createAlert')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      const userId = rootGetters['user/USER_ID']
      const alertsDb = rootGetters['alertsLocalDb/GET_ALERTS_LOCAL_DB']
      // creamos el timeStamp
      const startDate = Date.now()
      alertData._id = userId + ':' + startDate
      alertData.creationDate = startDate
      alertData.endDate += startDate
      // Damos formato a la alerta
      const alert = setAlert(alertData)
      console.log('el alert es: ' + JSON.stringify(alert))
      // Creamos la alerta en la base de datos local
      await createDoc(alertsDb, alert)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_ALERT error: ' + error)
    }
  },

  /**
   * Recuperamos las alertas de la base de datos
   *
   */
  async [LOAD_ALERTS]({ commit, dispatch }) {
    console.log('Estoy en LOAD_ALERTS')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      // Recuperamos las alertas de la base de datos
      const alerts = await dispatch('alertsLocalDb/GET_ALERTS', null, {
        root: true
      })
      return alerts
      // console.log('Las alertas son: ' + JSON.stringify(alerts))
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('LOAD_ALERTS error: ' + error)
    }
  }
}
