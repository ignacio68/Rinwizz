import { LOAD_USER, TO_JSON } from '@store/types/actions_types'

export default {
  /**
   * Autoautenticación, el usuario ya está registrado
   *
   * @param {String} user - id y email del usuario
   */
  async [LOAD_USER]({ commit, dispatch }) {
    console.log('LOAD_USER')
    commit('shared/CLEAR_ERROR', null, { root: true })
    // Recuperamos el _id del usuario
    // const userId = getters.USER_ID
    try {
      // Recuperamos la base de datos de los usuarios
      await dispatch('usersLocalDb/CREATE_ALL_USERS_LOCAL_DB', null, {
        root: true
      })
      await dispatch('usersLocalDb/REPLY_USERS_DB', null, { root: true })
      // Recuperamos los datos del usuario
      await dispatch('usersLocalDb/FETCH_USER', null, { root: true })
    } catch (error) {
      console.log('LOAD_USER error: ' + error)
    }
  },

  /**
   * Mostramos los datos del usuario en formato JSON
   */
  [TO_JSON]: ({ state }) => {
    console.log('Dato del usuario: ' + state.user.lastSignInDate)
  }
}
