export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    loading: false,
    error: null,
    actionPass: false
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    actionPass (state) {
      return state.actionPass
    }
  },
  mutations: {
    /* Control de la carga de los datos */
    setLoading (state, payload) {
      state.loading = payload
      console.log('Loading es ' + state.loading)
    },
    /* Control de errores */
    setError (state, payload) {
      state.error = payload
      console.log('el error es: ' + state.error.message)
    },
    /* Resetea los errores , el payload debe ser 'null' */
    clearError (state, payload) {
      state.error = payload
      console.log('Limpio el error')
    },
    setActionPass (state, payload) {
      state.actionPass = payload
      console.log('La acción ha sido ejecutada: ' + state.actionPass)
    }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    }
  }
}
