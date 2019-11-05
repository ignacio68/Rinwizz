import { LOAD_USER, TO_JSON } from '@store/types/actions_types'
// import { onAuthStateChange } from '@services/firebase'
export default {
  /**
   * Autoautenticación, el usuario ya está registrado
   *
   * @param {String} user - id y email del usuario
   */
  async [LOAD_USER]({ commit, dispatch }) {
    console.log('LOAD_USER')
    commit('shared/CLEAR_ERROR', null, { root: true })
    // await onAuthStateChange()
    //   .then(async user => {
    //     // console.log('user: ' + JSON.stringify(user))
    //     commit('SET_USER', user)
    // Recuperamos la base de datos de los usuarios
    await dispatch('usersLocalDb/CREATE_ALL_USERS_LOCAL_DB', null, {
      root: true
    })
      // })
      .then(async () => {
        await dispatch('usersLocalDb/FETCH_USER', null, { root: true })
        // dispatch('usersLocalDb/CHANGE_USER_DB', null, {
        //   root: true
        // })
      })
      .then(async () => {
        await dispatch('usersLocalDb/REPLY_USERS_DB', null, { root: true })
      })
      .catch(error => {
        console.log('LOAD_USER error: ' + error)
      })
  },
  // await onAuthStateChange()
  // .then(async user => {
  //   commit('user/SET_USER', user)
  //   // Recuperamos la base de datos de los usuarios
  //   await dispatch('usersLocalDb/CREATE_ALL_USERS_LOCAL_DB', null, {
  //     root: true
  //   })
  //   dispatch('usersLocalDb/FETCH_USER', null, { root: true })
  //   // dispatch('usersLocalDb/CHANGE_USER_DB', null, {
  //   //   root: true
  //   // })
  //   await dispatch('usersLocalDb/REPLY_USERS_DB', null, { root: true })
  //   // Recuperamos los datos del usuario
  //   // await dispatch('usersLocalDb/FETCH_USER', null, { root: true })
  // })
  // .catch(error => {
  //   console.log('LOAD_USER error: ' + error)
  // })
  /**
   * TODO: Sólo para pruebas
   * Mostramos los datos del usuario en formato JSON
   */
  [TO_JSON]: ({ state }) => {
    console.log('Dato del usuario: ' + state.user.lastSignInDate)
  }
}
