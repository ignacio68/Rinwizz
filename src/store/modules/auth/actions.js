import {
  firebaseAuth,
  firebaseDb,
  signUp,
  sendEmailVerification,
  logIn,
  logOut,
  deleteUser
} from '@services/firebase'

import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_USER,
  FETCH_CREDENTIAL,
  REAUTHENTICATE_USER,
  UPDATED_USER_PROFILE
} from '@store/types/actions_types'
import { getTokenId } from '../../../services/firebase/firebase'

export default {
  /**
   * Nuevo usuario
   *
   * @param {Object} registeredUser - datos a añadir al nuevo usuario
   */

  // FIXME: desarrollar correctamente async y el catcher de errores.
  async [SIGNUP_USER]({ state, commit, dispatch }, userData) {
    console.log('Estoy en SIGNUP_USER')
    commit('shared/LOAD_ACTION', null, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })

    signUp(userData)
      .then(user => {
        console.log('SIGNUP_USER: ' + JSON.stringify(user))
        const newUser = {
          _id: user.uid,
          email: user.email,
          name: userData.name,
          phone: '',
          isVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          // TODO: solo para producción
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/rinwizz-app.appspot.com/o/pwqhMnXx8ZMN06BeobDxJOZ5kDC2%2Favatar%2FpwqhMnXx8ZMN06BeobDxJOZ5kDC2..jpg?alt=media&token=8e64b798-eb08-46ec-a794-5d658e994301',
          providerId: user.providerId,
          creationDate: user.metadata.creationTime,
          // creationDate: user.createdAt,
          // lastSignInDate: user.lastLoginAt
          lastSignInDate: user.metadata.lastSignInTime
        }
        commit('user/SET_USER', newUser, { root: true })
      })
      .then(async () => {
        // Enviamos el email de confirmación
        const actionCodeSettings = state.actionCodeSettings
        await sendEmailVerification(actionCodeSettings)
      })
      .then(() => {
        commit('shared/LOAD_ACTION', true, { root: true })
      })
      .catch(error => {
        console.log('SIGNUP_USER error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
    //   commit('shared/SET_ERROR', null, { root: true })
    //   dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
    // }
  },

  /**
   * Log In de usuario existente
   *
   * @param {*} commit
   * @param {String} user
   */
  async [LOGIN_USER]({ commit, dispatch }, userData) {
    console.log('LOGIN_USER')
    commit('shared/LOAD_ACTION', null, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })

    logIn(userData)
      .then(user => {
        commit('user/SET_USER', user, { root: true })
        commit('shared/LOAD_ACTION', true, { root: true })
      })
      .catch(error => {
        console.log('logUserIn error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * Log Out de Usuario
   *
   * @param {*} commit
   */
  async [LOGOUT_USER]({ commit, dispatch }) {
    commit('shared/LOAD_ACTION', null, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })

    await logOut()
      .then(() => {
        commit('user/RESET_USER', null, { root: true })
        commit('alerts/RESET_ALERTS', null, { root: true })
        console.log('LOGOUT_USER')
      })
      .then(commit('shared/LOAD_ACTION', true, { root: true }))
      .catch(error => {
        console.log('LOGOUT_USER error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * Elimina el usuario
   */
  [DELETE_USER]: ({ getters, commit, dispatch }) => {
    console.log('Estoy en deleteUser')
    commit('shared/LOAD_ACTION', null, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })
    dispatch('FETCH_CREDENTIAL')
    let credential = getters.GET_CREDENTIAL
    console.log('myCredential es:' + credential)
    deleteUser(credential)
      .then(() => {
        commit('user/RESET_USER', null, { root: true })
      })
      .catch(error => {
        console.log('DELETE_USER error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * TODO: refactoring en firebase
   * Recupera la credencial del usuario
   */
  [FETCH_CREDENTIAL]: ({ state, commit, dispatch, rootGetters }) => {
    console.log('Estoy en getCredential')
    commit('shared/CLEAR_ERROR', null, { root: true })
    getTokenId()
      .then(idToken => {
        console.log('El idToken es: ' + idToken)
        const providerId = rootGetters.USER_PROVIDER_ID
        if (providerId) {
          switch (providerId) {
            case 'facebook': {
              console.log('el provider es: ' + providerId)
              const facebook = firebaseAuth.FacebookAuthProvider.credential(
                idToken
              )
              commit('SET_CREDENTIAL', facebook)
              break
            }

            case 'google': {
              console.log('el provider es: ' + providerId)
              const google = firebaseAuth.GoogleAuthProvider.credential(idToken)
              commit('SET_CREDENTIAL', google)
              break
            }
            case 'twitter': {
              console.log('el provider es: ' + providerId)
              const twitter = firebaseAuth.TwitterAuthProvider.credential(
                idToken
              )
              commit('SET_CREDENTIAL', twitter)
              break
            }
            case 'password': {
              console.log('el provider es: ' + providerId)
              const email = state.user.email
              const userPassword = state.user.password
              const password = firebaseAuth.EmailAuthProvider.credential(
                email,
                userPassword
              )
              console.log('la credencial es: ' + password)
              commit('SET_CREDENTIAL', password)
              break
            }

            default:
              console.log('No hay providerId: ' + providerId)
          }
        } else {
          commit('shared/SET_ERROR', null, { root: true })
          console.log('Error: No hay credencial')
        }
      })
      .catch(error => {
        console.log('FETCH_CREDENTIAL error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * TODO: refactoring en firebase service
   * Reautenticación automática del usuario
   * Se utiliza para poder elimnar la cuenta de usuario
   */
  [REAUTHENTICATE_USER]: ({ state, commit, dispatch }) => {
    console.log('Estoy en reauthenticateUser')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const currentUser = firebaseAuth().currentUser
    let credential = state.credential
    currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        dispatch('DELETE_FIREBASE_USER_ACCOUNT')
      })
      .catch(error => {
        console.log('REAUTHENTICATE_USER error: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  },

  /**
   * Actualizamos la información del usuario y la base de datos
   *
   * @param {*} commit
   * @param {*} state
   * @param {Object} user - datos del usuario para actualizar
   */
  // TODO: repasar todo, actualizar base de datos
  [UPDATED_USER_PROFILE]: ({ _, commit, __, rootGetters }, user) => {
    console.log('Estoy en UPDATED_USER_PROFILE')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const userUpdated = {
      // userIcon: user.userIcon, // por el momento utilizar direcciones URL
      userName: user.userName
    }
    const userId = rootGetters['user/USER_ID']
    // Actualizamos los datos en Firebase Realtime Database
    firebaseDb
      .ref('users/' + userId)
      .update(userUpdated)
      .then(() => {
        console.log(
          'Actualizada en Firebase la base de datos del usuario: ' +
            user.userName
        )
      })
      // TODO: revisar y actualizar errores
      .catch(error => {
        console.log('error en UPDATED_USER_PROFILE: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  }
}
