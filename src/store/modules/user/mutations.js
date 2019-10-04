import {
  SET_USER,
  CLEAR_USER,
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
    // if (newUser.uid) {
    //   const userId = newUser.uid
    //   newUser._id = userId
    //   delete newUser.uid
    // }
    state.user = newUser
    console.log('SET_USER, el usuario es: ' + JSON.stringify(newUser))
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
   * Actualiza los datos del usuario
   *
   * @param {*} state
   * @param {object} userData - Datos a añadir a los del usuario
   */
  [UPDATE_USER]: (state, userData) => {
    console.log('Estoy UPDATE_USER')
    const user = state.user
    console.log('El user es: ' + JSON.stringify(user))
    const updatedUser = { ...user, ...userData }
    console.log('El nuevo user es: ' + JSON.stringify(updatedUser))
    state.user = updatedUser
    console.log('state.user es: ' + JSON.stringify(state.user))
  },
  /**
   * Establece la credencial del usuario
   */
  [SET_CREDENTIAL]: (state, credential) => {
    state.credential = credential
    console.log('credential es: ' + credential)
  }
}
