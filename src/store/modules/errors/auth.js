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
     *
     * @param {String} errorCode Código de error de Firebase
     */
    // TODO: Terminar de completar e internacionalizar
    authError({ commit }, errorCode) {
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
        case 'auth/user-disabled': {
          const message = i18n.t('lang.errors.auth.userDisabled')
          commit('setErrorMessage', message)
          break
        }
        case 'auth/user-not-found': {
          const message = i18n.t('lang.errors.auth.userNotFound')
          commit('setErrorMessage', message)
          break
        }
        case 'auth/wrong-password': {
          const message = i18n.t('lang.errors.auth.wrongPassword')
          commit('setErrorMessage', message)
          break
        }
        default: {
          const message = i18n.t('lang.errors.auth.internalError')
          commit('setErrorMessage', message)
        }
      }
      commit('shared/setError', true, { root: true })
    }
  }
}
