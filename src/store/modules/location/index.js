import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    lat: '',
    lng: '',
    acc: '',
    alt: '',
    altAcc: '',
    head: '',
    spd: '',
    ts: '',
    watchID: null,
    address: {}
  },
  getters,
  mutations,
  actions
}
