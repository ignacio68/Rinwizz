import getters from './getters'
import mutations from './mutations'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    stack: [],
    options: {},
    index: 1 // Tabbar
  },
  getters,
  mutations
}
