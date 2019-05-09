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
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    actionPass: state => state.actionPass
  },
  mutations: {
    /**
     * Control de la carga de los datos
     *
     * @param {Boolean} payload
     */
    setLoading: (state, payload) => {
      state.loading = payload
      console.log('Loading es ' + state.loading)
    },
    /**
     * Control de errores
     *
     * @param {String} payload - mensaje de error
     */
    setError: state => {
      state.error = true
      console.log('El error es: ' + state.error)
    },
    /**
     * Resetea los errores , el payload debe ser 'null'
     *
     * @param {*} payload
     */
    clearError: state => {
      state.error = false
      console.log('Errores limpio')
    },
    /**
     * Comprueba si la acción ha sido ejecutada
     *
     * @param {Boolean} payload
     */
    setActionPass: (state, payload) => {
      state.actionPass = payload
      console.log('La acción ha sido ejecutada: ' + state.actionPass)
    },
    /**
     *Establece la plattaforma en la que corre la app
     *
     * @param {String} platform
     */
    setPlatform: (state, platform) => {
      state.platform = platform
      console.log('La plataforma de la app es: ' + platform)
    },
    /**
     * Establece el idioma del navegador
     *
     * @param {String} lang
     */
    setLanguage: (state, lang) => {
      state.lang = lang
      console.log('Se ha establecido el idioma')
    }
  },
  actions: {
    /**
     * Limpia el error
     */
    clearError({ commit }) {
      commit('clearError')
    },
    /**
     * Establece la plataforma en la que se ejecuta la app
     */
    getPlatform({ commit }) {
      if (this.$ons.platform.isAndroid()) {
        const platform = 'md'
        commit('setPlatform', platform)
      } else if (this.$ons.platform.isIphone()) {
        const platform = 'ios'
        commit('setPlatform', platform)
      } else {
        const platform = 'web'
        commit('setPlatform', platform)
      }
    }
  }
}
