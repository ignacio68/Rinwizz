export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    errorMessage: ''
  },
  getters: {},
  mutations: {},
  actions: {
    /**
     * Manejo de los errores de autenticación
     * TODO:
     * 1. Terminar de completar e internacionalizar
     *
     * @param {String} errorCode - Código de error de Firebase
     */
    authError(state, commit, errorCode) {
      // commit('shared/clearError', false, { root: true })
      console.log('authError es: ' + errorCode)
      switch (errorCode) {
        case 'auth/credential-already-in-use':
          state.errorMessage = 'Ya existe un usuario con esta cuenta'
          break
        case 'auth/email-already-in-use':
          state.errorMessage = 'Ya existe un usuario con el mismo email'
          break
        case 'auth/operation-not-allowed':
          state.errorMessage = 'Este tipo de cuentas no esta habilitada'
          break
        case 'auth/user empty':
          state.errorMessage = 'El usuario está vacio'
          break
        default:
          state.errorMessage = errorCode
      }
      console.log('el error en la autorización es:' + state.errorMessage)
      // commit('shared/setError', state.errorMessage, { root: true })
    }
  }
}
