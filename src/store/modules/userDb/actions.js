import { firebaseDb } from '../../../firebase'
import { CREATE_USER_DB, USER_NAME_DB } from '@store/types/actions_types'

export default {
  /**
   * Creamos la base de datos del usuario
   *
   * @param {*} commit
   * @param {*} dispatch
   * @param {Object} newUser - datos del usuario
   */
  // TODO: Convertir en async
  [CREATE_USER_DB]: ({ state, commit, dispatch }, newUser) => {
    commit('shared/CLEAR_ERROR', null, {
      root: true
    })
    console.log('Estoy en CREATE_USER_DB')
    // const userId = user.id
    // const creationDate = user.metadata.creationTime
    console.log('el id del usuario es: ' + newUser.id)
    console.log('La fecha de creación es: ' + newUser.creationDate)
    firebaseDb
      .ref('users')
      .child(newUser.id)
      .set(newUser)
      .then(() => {
        // Añade el nombre de usuario a la base de datos
        dispatch('USER_NAME_DB', newUser.name)
        // Actualizamos los datos en Local Storage (LokiJS)
        // dispatch('localDb/CREATE_USER_LOCAL_DB', user, {
        //  root: true
        // })
        console.log(newUser.email)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log(error)
      })
  },

  /**
   *
   * Añade el nombre la base de datos /usersNames
   * TODO: REVISAR -> crea una nueva key con el valor userName
   *
   * @param {*} commit
   * @param {String} userName
   */
  [USER_NAME_DB]: ({ commit }, userName) => {
    console.log('Estoy en USER_NAME_DB')
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseDb
      .ref('usersName/names')
      .update({
        userName
      })
      .then(() => {
        console.log(
          'Añadido el nombre de usuario a la base de datos "UserNames"'
        )
        // Comprobamos que se ha añadido a Firebase
        firebaseDb
          .ref('users')
          .on('child_added', snapshot => console.log(snapshot.val()))
      })
      .catch(error => {
        console.log('USER_NAME_DB error: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  }
}
