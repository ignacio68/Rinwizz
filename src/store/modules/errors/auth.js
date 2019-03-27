import i18n from '../../../i18n'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    errorMessage: ''
  },
  getters: {
    errorMessage(state) {
      return state.errorMessage
    }
  },
  mutations: {
    /**
     * Actualiza errorMessage
     *
     * @param {void} state
     * @param {String} message
     */
    setErrorMessage(state, message) {
      state.errorMessage = message
    }
  },
  actions: {
    /**
     * Manejo de los errores de autenticación
     * TODO:
     * 1. Terminar de completar e internacionalizar
     *
     * @param {String} errorCode - Código de error de Firebase
     */
    authError({ state, commit }, error) {
      const errorCode = error.errorCode
      console.log('Estoy en authError')
      console.log('authError es: ' + errorCode)
      switch (errorCode) {
        case 'auth/email-already-in-use': {
          const message = i18n.t('lang.errors.auth.emailAlreadyInUse')
          commit('setErrorMessage', message)
          break
        }
        case 'auth/invalid-email': {
          const message = i18n.t('lang.errors.auth.invalidEmail')
          commit('setErrorMessage', message)
          break
        }
        case 'auth/weak-password': {
          const message = i18n.t('lang.errors.auth.weakPassword')
          // const message = 'email no válido'
          commit('setErrorMessage', message)
          break
        }
        case 'auth/user-empty': {
          const message = i18n.t('lang.errors.auth.userEmpty')
          commit('setErrorMessage', message)
          break
        }
        default: {
          const message = i18n.t('lang.errors.auth.internalError')
          commit('setErrorMessage', message)
        }
      }
      // const message = state.errorMessage
      commit('shared/setError', true, { root: true })
    }
  }
}
