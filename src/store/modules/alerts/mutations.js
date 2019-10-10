import { SET_LOADED_ALERTS, SET_ALERT } from '@store/types/mutations_types'

export default {
  /**
   * Carga las alertas en el objeto loadedAlerts del State
   *
   * @param {Object} alerts
   */
  [SET_LOADED_ALERTS]: (state, loadedAlerts) => {
    console.log('SET_LOADED_ALERTS')
    state.loadedAlerts = loadedAlerts
    console.log(state.loadedAlerts)
  },
  /**
   * Añade una alerta nueva al objeto loadedAlerts en el State
   *
   * @param {Object} alert
   */
  [SET_ALERT]: (state, alert) => {
    console.log('SET_ALERT')
    state.alerts.push(alert)
  }
}
