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
      const user = rootGetters['user/USER']
      const alertsDb = rootGetters['alertsLocalDb/GET_ALERTS_LOCAL_DB']
      // creamos el timeStamp
      const publishDate = Date.now()
      // TODO: Revisar user------------------- //
      alertData.user.name = user.name
      alertData.user._id = user._id
      alertData.user.screenName = user.screenName
      alertData.user.avatar = user.avatar
      alertData.user.location = user.location
      // ------------------------------------- //
      alertData._id = user._id + ':' + publishDate
      alertData.creationDate = publishDate
      alertData.endDate += publishDate
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
    // Recuperamos las alertas de la base de datos
    await dispatch('alertsLocalDb/GET_ALERTS', null, {
      root: true
    })
      .then(alerts => {
        console.log('Recuperando las alertas!!' + JSON.stringify(alerts))
        commit('SET_LOADED_ALERTS', alerts)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log('LOAD_ALERTS error: ' + error)
      })
  }
}
