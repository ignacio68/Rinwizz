import {
  firebaseAuth,
  firebaseDb,
  signUp,
  setUserProfile,
  sendEmailVerification,
  logIn,
  logOut
} from '@services/firebase'

import {
  SIGNUP_USER,
  SET_USER_PROFILE,
  APPLY_ACTION_CODE,
  LOGIN_USER,
  LOGOUT_USER,
  ON_AUTH_STATE_CHANGE,
  DELETE_USER,
  FETCH_CREDENTIAL,
  REAUTHENTICATE_USER,
  DELETE_FIREBASE_USER_ACCOUNT,
  UPDATED_USER_PROFILE
} from '@store/types/actions_types'

import AppSplitter from '@views/AppSplitter'
import Welcome from '@views/Welcome'
import LogIn from '@views/Auth/LogIn'

export default {
  /**
   * Nuevo usuario
   *
   * @param {Object} registeredUser - datos a añadir al nuevo usuario
   */

  // FIXME: desarrollar correctamente async y el catcher de errores.
  async [SIGNUP_USER]({ state, commit, dispatch }, userData) {
    console.log('Estoy en SIGNUP_USER')
    // TODO: revisar SET ACTION PASS
    commit('shared/CLEAR_ERROR', null, { root: true })
    /**
     * Crea el nuevo usuario en Firebase
     *
     * @param {String} registeredUser.email - email del usuario
     * @param {String} registeredUser.password - password del usuario
     */
    // let newUser = void 0
    signUp(userData)
      .then(async user => {
        // Añadimos los datos del nuevo usuario
        const newUser = {
          _id: user.uid,
          email: user.email,
          // password: registeredUser.password,
          name: userData.name,
          phone: '',
          isVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          // TODO: solo para producción
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/rinwizz-app.appspot.com/o/pwqhMnXx8ZMN06BeobDxJOZ5kDC2%2Favatar%2FpwqhMnXx8ZMN06BeobDxJOZ5kDC2..jpg?alt=media&token=8e64b798-eb08-46ec-a794-5d658e994301',
          providerId: user.providerId,
          creationDate: user.metadata.creationTime,
          lastSignInDate: user.metadata.lastSignInTime
        }
        // console.log('newUser: ' + JSON.stringify(newUser))
        commit('user/SET_USER', newUser, { root: true })
        // Actualizamos el perfil de firebase con el displayName
        await setUserProfile({ displayName: newUser.name })
      })
      .then(async () => {
        // console.log('Hay un nuevo usuario: ' + state.user.name)
        // Enviamos el email de confirmación
        const actionCodeSettings = state.actionCodeSettings
        await sendEmailVerification(actionCodeSettings)
        // await dispatch('SEND_EMAIL_VERIFICATION', actionCodeSettings)
      })
      .then(() => {
        commit('shared/LOAD_ACTION', true, { root: true })
      })
      .catch(error => {
        console.log('SIGNUP_USER error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })

    // } else {
    //   console.log('Hay un error')
    //   commit('shared/SET_ERROR', null, { root: true })
    //   dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
    // }
  },

  /**
   * TODO: eliminar, utilizamos Cloudant
   *  Actualiza el perfil de usuario de Firebase
   * @param {object} user - datos del usuario a actualizar
   */

  async [SET_USER_PROFILE]({ commit, dispatch }, user) {
    commit('shared/CLEAR_ERROR', null, { root: true })
    console.log('Estoy en SET_USER_PROFILE')
    try {
      const userActive = await firebaseAuth().currentUser
      await userActive.updateProfile(user)
      console.log('Se ha actualizado el perfil de: ' + user.displayName)
    } catch (error) {
      commit('shared/SET_ERROR', null, { root: true })
      console.log('UPDATE PROFILE error: ' + error)
      dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
    }
  },

  [APPLY_ACTION_CODE]: ({ commit, dispatch }, code) => {
    console.log('Estoy en applyActionCode')
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth
      .applyActionCode(code)
      .then(() => {
        console.log('codigo de verificación')
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        // TODO: Revisar los codigos de error y añadir a locales
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * Log In de usuario existente
   *
   * @param {*} commit
   * @param {String} user
   */
  async [LOGIN_USER]({ commit, dispatch }, userData) {
    console.log('LOGIN_USER')
    commit('shared/CLEAR_ERROR', null, { root: true })
    // Comprueba que el usuario existe en Firebase
    logIn(userData)
      .then(user => {
        // Establecemos la información de usuario en caché
        commit('user/SET_USER', user, { root: true })
        // Lanzamos la página principal
        commit('navigator/REPLACE', AppSplitter, {
          root: true
        })
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
  async [LOGOUT_USER]({ commit }) {
    commit('shared/CLEAR_ERROR', null, { root: true })
    // firebaseAuth()
    //   .signOut()
    await logOut()
      .then(result => {
        commit('user/RESET_USER', null, { root: true })
        commit('alerts/RESET_ALERTS', null, { root: true })
        console.log('LOGOUT_USER')
      })
      .then(commit('navigator/PUSH', LogIn, { root: true }))
      .catch(error => {
        console.log('LOGOUT_USER error: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  },

  /**
   * Ponemos un observador
   */
  [ON_AUTH_STATE_CHANGE]: ({ commit }) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth().onAuthstateChange(user => {
      if (user) {
        console.log(user)
      } else {
        console.log('Error en ON_AUTH_STATE_CHANGE()')
        commit('shared/SET_ERROR', null, { root: true })
      }
    })
  },

  /**
   * Elimina el usuario
   */
  [DELETE_USER]: ({ state, commit, dispatch }) => {
    console.log('Estoy en deleteUser')
    commit('shared/CLEAR_ERROR', null, { root: true })
    dispatch('FETCH_CREDENTIAL')
    let currentUser = firebaseAuth().currentUser
    let credential = state.credential
    console.log('myCredential es:' + credential)
    currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        dispatch('DELETE_FIREBASE_USER_ACCOUNT')
        commit('user/RESET_USER', null, { root: true })
      })
      .catch(error => {
        console.log('DELETE_USER error: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  },

  /**
   * Recupera la credencial del usuario
   */
  [FETCH_CREDENTIAL]: ({ commit, state }) => {
    console.log('Estoy en getCredential')
    commit('shared/CLEAR_ERROR', null, { root: true })
    let currentUser = firebaseAuth().currentUser
    const idToken = currentUser.getIdToken()
    console.log('El idToken es: ' + idToken)
    const providerId = state.user.providerId
    if (providerId) {
      switch (providerId) {
        case 'facebook.com': {
          console.log('el provider es: ' + providerId)
          const facebook = firebaseAuth.FacebookAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', facebook)
          break
        }

        case 'google.com': {
          console.log('el provider es: ' + providerId)
          const google = firebaseAuth.GoogleAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', google)
          break
        }
        case 'twitter.com': {
          console.log('el provider es: ' + providerId)
          const twitter = firebaseAuth.TwitterAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', twitter)
          break
        }
        case 'password': {
          console.log('el provider es: ' + providerId)
          let email = state.user.email
          let userPassword = state.user.password
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
  },

  /**
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
   * Elimina la cuenta de usuario de Firebase
   */
  [DELETE_FIREBASE_USER_ACCOUNT]: ({ commit }) => {
    console.log('Estoy en deleteFirebaseUserAccount')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const currentUser = firebaseAuth().currentUser
    // dispatch('getCredential')
    currentUser
      .delete()
      .then(() => {
        console.log('Usuario eliminado')
        commit('user/RESET_USER', null, { root: true })
        commit('navigator/REPLACE', Welcome, {
          root: true
        })
      })
      .catch(error => {
        console.log('DELETE_FIREBASE_USER_ACCOUNT error: ' + error)
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
