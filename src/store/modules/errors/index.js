import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    errorMessage: ''
  },
  getters,
  mutations,
  actions
}
