/**
 * Metodos utilizados para el uso de las alertas
 */
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    loadedAlerts: []
  },
  getters,
  mutations,
  actions
}
