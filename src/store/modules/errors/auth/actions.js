import i18n from '@locales'

import { AUTH_ERROR } from '../../../types/actions_types'

export default {
  /**
   * Manejo de los errores de autenticación
   *
   * @param {String} errorCode Código de error de Firebase
   */
  // TODO: Terminar de completar e internacionalizar
  [AUTH_ERROR]: ({ commit }, errorCode) => {
    console.log('Estoy en authError')
    console.log('authError es: ' + errorCode)
    switch (errorCode) {
      case 'auth/email-already-in-use': {
        const message = i18n.t('lang.errors.auth.emailAlreadyInUse')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/invalid-email': {
        const message = i18n.t('lang.errors.auth.invalidEmail')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/weak-password': {
        const message = i18n.t('lang.errors.auth.weakPassword')
        // const message = 'email no válido'
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/user-empty': {
        const message = i18n.t('lang.errors.auth.userEmpty')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/user-disabled': {
        const message = i18n.t('lang.errors.auth.userDisabled')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/user-not-found': {
        const message = i18n.t('lang.errors.auth.userNotFound')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      case 'auth/wrong-password': {
        const message = i18n.t('lang.errors.auth.wrongPassword')
        commit('SET_ERROR_MESSAGE', message)
        break
      }
      default: {
        const message = i18n.t('lang.errors.auth.internalError')
        commit('SET_ERROR_MESSAGE', message)
      }
    }
    commit('shared/setError', true, { root: true })
  }
}
