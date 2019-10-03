import { alertSample } from '@utils/database'

import { CREATE_ALERT, LOAD_ALERTS } from '@store/types/actions_types'

export default {
  /**
   * Crea una alerta
   *
   * @param {Object} alertData - Datos de la alerta
   */
  async [CREATE_ALERT]({ state, commit, dispatch }, user, alertData) {
    console.log('Estoy en createAlert')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      // creamos el timeStamp
      const startDate = Date.now()
      console.log('La fecha de inicio de la alerta es: ' + startDate)

      // Damos formato a la alerta
      const alert = await JSON.parse(JSON.stringify(alertSample))
      alert._id = startDate + '/' + user._id
      alert.title = alertData.title
      alert.text = alertData.text
      alert.user = user
      alert.creationDate = startDate
      alert.endDate = alertData.endDate
      alert.link = alertData.link
      alert.phone = alertData.phone
      alert.location = alertData.location
      alert.entities = alertData.entities
      alert.extendedEntities = alertData.extendedEntities
      alert.favoriteCount = alertData.favoriteCount
      console.log('el alert es: ' + JSON.stringify(alert))

      await dispatch('alertsLocalDb/PUT_ALERT_LOCAL_DB'.alert, { root: true })
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('CREATE_ALERT es: ' + error)
    }
  },

  /**
   *   DEPRECATED
   *
   * Recuperamos las alertas de la base de datos
   *
   */
  async [LOAD_ALERTS]({ commit, dispatch }) {
    console.log('Estoy en LOAD_ALERTS')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      // Recuperamos las alertas de la base de datos
      const alerts = await dispatch('alertsAlertsDb/GET_ALERTS', null, {
        root: true
      })
      console.log('Las alertas son: ' + JSON.stringify(alerts))
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('LOAD_ALERTS error: ' + error)
    }
  }
}
