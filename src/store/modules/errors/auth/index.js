export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    errorMessage: ''
  },
  getters: {},
  mutations: {
    /**
     * Manejo de los errores de autenticación
     * Terminar de completar e internacionalizar
     *
     * @param {String} errorCode - Código de error de Firebase
     */
    authError(state, errorCode) {
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
        default:
          state.errorMessage = errorCode
      }
      console.log('el error en la autorización es:' + state.errorMessage)
    }
  },
  actions: {}
}
