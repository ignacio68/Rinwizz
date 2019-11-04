import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_PLATFORM,
  SET_LANGUAGE
} from '@store/types/mutations_types'
// TODO: Repasar el funcionamiento del control de errores --> ELIMINAR!
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
   * Resetea los errores
   *
   * @param {*} payload
   */
  [CLEAR_ERROR]: state => {
    state.error = false
    // const errorMessage = ''
    // commit('errors/SET_ERROR_MESSAGE', errorMessage, { root: true })
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
