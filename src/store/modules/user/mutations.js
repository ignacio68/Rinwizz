import {
  SET_USER,
  CLEAR_USER,
  SET_CREDENTIAL
} from '@store/types/mutations_types'

export default {
  /**
   * Crea un nuevo usuario
   *
   * @param {*} state
   * @param {Object} newUser - Parámetros a añadir al usuario
   */
  [SET_USER]: (state, newUser) => {
    state.user = newUser
    console.log('estoy en SET_USER')
    console.log('El id de usuario es: ' + newUser.id)
  },
  /**
   * Resetea el usuario
   *
   * @param {*} state
   */
  [CLEAR_USER]: state => {
    state.user = null
  },
  /**
   * Establece la credencial del usuario
   */
  [SET_CREDENTIAL]: (state, credential) => {
    state.credential = credential
    console.log('credential es: ' + credential)
  }
}
