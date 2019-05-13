import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_ACTION_PASS,
  SET_PLATFORM,
  SET_LANGUAGE
} from '@store/types/mutations_types'

export default {
  /**
   * Control de errores
   *
   * @param {String} payload - mensaje de error
   */
  [SET_ERROR]: state => {
    state.error = true
    console.log('El error es: ' + state.error)
  },
  /**
   * Resetea los errores , el payload debe ser 'null'
   *
   * @param {*} payload
   */
  [CLEAR_ERROR]: state => {
    state.error = false
    console.log('Errores limpio')
  },
  /**
   * Comprueba si la acción ha sido ejecutada
   *
   * @param {Boolean} payload
   */
  [SET_ACTION_PASS]: (state, payload) => {
    state.actionPass = payload
    console.log('La acción ha sido ejecutada: ' + state.actionPass)
  },
  /**
   *Establece la plattaforma en la que corre la app
   *
   * @param {String} platform
   */
  [SET_PLATFORM]: (state, platform) => {
    state.platform = platform
    console.log('La plataforma de la app es: ' + platform)
  },
  /**
   * Establece el idioma del navegador
   *
   * @param {String} lang
   */
  [SET_LANGUAGE]: (state, lang) => {
    state.lang = lang
    console.log('Se ha establecido el idioma')
  }
}
