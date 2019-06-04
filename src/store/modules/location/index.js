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
    errorCode: null,
    defaults: {
      autowatch: true,
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }
  },
  getters,
  mutations,
  actions
} 
