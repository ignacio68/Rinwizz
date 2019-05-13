import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    loading: false,
    error: false,
    errorMessage: '',
    actionPass: false,
    platform: '',
    lang: ''
  },
  getters,
  mutations,
  actions
}
