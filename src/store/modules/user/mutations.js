import {
  SET_USER,
  RESET_USER,
  UPDATE_USER,
  SET_CREDENTIAL
} from '@store/types/mutations_types'

export default {
  /**
   * Crea un nuevo usuario
   *
   * @param {*} state
   * @param {object} newUser - Datos del nuevo usuario
   */
  [SET_USER]: (state, newUser) => {
    // Si el usuario proviene de Firebase cambiamos uid por _id
    console.log('mutation SET_USER')
    if (newUser.uid) {
      newUser._id = newUser.uid
      state.user = newUser
      // state.user = { ...state.user, newUser }
    } else {
      state.user = newUser
      // state.user = { ...state.user, newUser }
    }
  },
  /**
   * Resetea el usuario
   *
   * @param {*} state
   */
  [RESET_USER]: state => {
    state.user = null
  },
  /**
   * Actualiza los datos del usuario
   *
   * @param {*} state
   * @param {object} userData - Datos a añadir a los del usuario
   */
  [UPDATE_USER]: (state, userData) => {
    console.log('Estoy UPDATE_USER')
    const user = state.user
    const updatedUser = { ...user, ...userData }
    state.user = updatedUser
  },
  /**
   * Establece la credencial del usuario
   */
  [SET_CREDENTIAL]: (state, credential) => {
    state.credential = credential
    console.log('credential es: ' + credential)
  }
}
