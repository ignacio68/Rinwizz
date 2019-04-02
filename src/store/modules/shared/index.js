export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    loading: false,
    error: false,
    errorMessage: '',
    actionPass: false
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    actionPass(state) {
      return state.actionPass
    }
  },
  mutations: {
    /**
     * Control de la carga de los datos
     *
     * @param {Boolean} payload
     */
    setLoading(state, payload) {
      state.loading = payload
      console.log('Loading es ' + state.loading)
    },
    /**
     * Control de errores
     *
     * @param {String} payload - mensaje de error
     */
    setError(state) {
      state.error = true
      console.log('El error es: ' + state.error)
      // state.errorMessage = errorMessage
      // console.log('el error es: ' + state.errorMessage)
    },
    /**
     * Resetea los errores , el payload debe ser 'null'
     *
     * @param {*} payload
     */
    clearError(state) {
      state.error = false
      console.log('El error es: ' + state.error)
    },
    /**
     * Comprueba si la acción ha sido ejecutada
     *
     * @param {Boolean} payload
     */
    setActionPass(state, payload) {
      state.actionPass = payload
      console.log('La acción ha sido ejecutada: ' + state.actionPass)
    }
  },
  actions: {
    /**
     * Limpia el error
     */
    clearError({ commit }) {
      commit('clearError')
    }
  }
}
