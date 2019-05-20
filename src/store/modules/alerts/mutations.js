import {
  SET_LOADED_ALERTS,
  CREATE_ALERT,
  SET_NUM_ALERTS
} from '@store/types/mutations_types'

export default {
  /**
   * Carga las alertas en el objeto loadedAlerts del State
   *
   * @param {Object} alerts
   */
  [SET_LOADED_ALERTS]: (state, alerts) => {
    console.log('Estoy en setLoadedAlerts')
    state.loadedAlerts = alerts
    console.log(state.loadedAlerts)
  },
  /**
   * Añade una alerta nueva al objeto loadedAlerts en el State
   *
   * @param {Object} alert
   */
  [CREATE_ALERT]: (state, alert) => {
    state.loadedAlerts.push(alert)
  },
  /**
   * recupera el número de alertas para mostrar
   */
  [SET_NUM_ALERTS]: (state, alerts) => {
    state.numAlerts = alerts
  }
}
