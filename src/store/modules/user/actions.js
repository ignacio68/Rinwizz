import { firebaseAuth, firebaseDb } from '../../../firebase'

import {
  SIGNUP_USER,
  UPDATE_PROFILE,
  SEND_EMAIL_VERIFICATION,
  APPLY_ACTION_CODE,
  LOGIN_USER,
  LOGOUT_USER,
  ON_AUTH_STATE_CHANGE,
  DELETE_USER,
  GET_CREDENTIAL,
  REAUTHENTICATE_USER,
  DELETE_FIREBASE_USER_ACCOUNT,
  FAKE_USER,
  AUTO_SIGN_IN,
  RESET_PASSWORD,
  CONFIRM_RESET_PASSWORD,
  VERIFY_RESET_PASSWORD_CODE,
  UPDATED_USER_INFO,
  CREATE_USER_DB,
  USER_NAME_DB,
  IS_USER_ACTIVE,
  TO_JSON
} from '@store/types/actions_types'

import HomePage from '@pages/HomePage'
import Welcome from '@pages/Shared/Welcome'
import LogIn from '@pages/User/LogIn'

/**
 * TODO:
 * 1. Convertir todas las acciones con firebasea async/await
 * 2. El resto de acciones convertirlas en Promise
 * 3. Desarrollar la acción AUTH_ERROR en el módulo "errors/auth"
 */

export default {
  /**
   * Nuevo usuario
   *
   * @param {*} commit
   * @param {*} dispatch
   * @param {Object} registerUser - datos a añadir al nuevo usuario
   */

  // FIXME: desarrollar correctamente async y el catcher de errores.
  async [SIGNUP_USER]({ state, commit, dispatch }, registerUser) {
    console.log('Estoy en signUserUp')
    commit('shared/SET_ACTION_PASS', false, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })
    /**
     * Crea el nuevo usuario en Firebase
     *
     * @param {String} registerUser.email - email del usuario
     * @param {String} registerUser.password - password del usuario
     */
    try {
      const result = await firebaseAuth().createUserWithEmailAndPassword(
        registerUser.email,
        registerUser.password
      )
      const { user } = result
      if (user) {
        console.log('Estoy dentro de createUserWithEmailAndPassword')
        console.log(user)
        commit('shared/SET_ACTION_PASS', true, { root: true })

        // Añadimos los datos del nuevo usuario
        const newUser = {
          id: user.uid,
          email: user.email,
          // password: registerUser.password,
          name: registerUser.name,
          phone: user.phoneNumber,
          isVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          avatar: user.photoURL,
          providerId: user.providerId,
          creationDate: user.metadata.creationTime,
          lastSignInDate: user.metadata.lastSignInTime
        }
        // Actualizamos el perfil de firebase con el name
        await dispatch('UPDATE_PROFILE', { displayName: newUser.name })

        // Llamamos a 'setUser' para crear el nuevo usuario localmente
        await commit('SET_USER', newUser)

        // Añadimos los datos a la base de datos (Realtime Database)
        await dispatch('CREATE_USER_DB', newUser)

        console.log('Hay un nuevo usuario: ' + state.user.name)
        // Enviamos el email de confirmación
        const actionCodeSettings = state.actionCodeSettings
        await dispatch('SEND_EMAIL_VERIFICATION', actionCodeSettings)
      } else {
        console.log('Hay un error')
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
      }
    } catch (error) {
      console.log('signUserUp error: ' + error.message)
      commit('shared/SET_ERROR', null, { root: true })
      dispatch('errors/AUTH_ERROR', error.code, { root: true })
      commit('shared/SET_ACTION_PASS', false, { root: true })
    }
  },

  /**
   *  Actualiza el perfil de usuario de Firebase
   * @param {object} user - datos del usuario a actualizar
   */

  [UPDATE_PROFILE]: ({ commit, dispatch }, user) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
    const userActive = firebaseAuth().currentUser
    userActive
      .updateProfile(user)
      .then(() => {
        console.log('Se ha actualizado el perfil de: ' + user.displayName)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log('UPDATE PROFILE error: ' + error)
        // dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
      })
  },

  [APPLY_ACTION_CODE]: ({ commit, dispatch }, code) => {},

  /**
   * Enviamos un email de confirmación de la cuenta de usuario
   *
   * @param {Object} actionCodeSettings - parametros necesarios para enviar el email de confirmación
   */
  [SEND_EMAIL_VERIFICATION]: ({ commit, dispatch }, actionCodeSettings) => {
    console.log('Estoy en sendEmailVerification')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
      currentUser
        .sendEmailVerification(actionCodeSettings)
        .then(() => {
          console.log('email enviado')
        })
        .catch(error => {
          dispatch('errors/AUTH_ERROR', error.code, { root: true })
          console.log('sendEmailVerification error: ' + error.message)
        })
    } else {
      commit('shared/SET_ERROR', null, { root: true })
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
  async [LOGIN_USER]({ commit, dispatch }, logInUser) {
    console.log('Estoy en signUserIn')
    commit('shared/CLEAR_ERROR', null, { root: true })
    /* Comprueba que el usuario existe en Firebase */
    try {
      const result = await firebaseAuth().signInWithEmailAndPassword(
        logInUser.email,
        logInUser.password
      )
      const { user } = result
      if (user) {
        console.log('signUserIn user')
        const newUser = {
          id: user.uid
        }
        commit('SET_USER', newUser)
        commit('navigator/REPLACE', HomePage, {
          root: true
        })
      }
    } catch (error) {
      console.log('logUserIn error: ' + error.message)
      commit('shared/SET_ERROR', null, { root: true })
      dispatch('errors/AUTH_ERROR', error.code, { root: true })
    }
  },

  /**
   * Log Out de Usuario
   *
   * @param {*} commit
   */
  [LOGOUT_USER]: ({ commit }) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth()
      .signOut()
      .then(result => {
        commit('CLEAR_USER')
        // TODO: Revisar si funciona la eliminacion de las alertas
        commit('alerts/SET_LOADED_ALERTS', null, { root: true })
        console.log(result)
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
  async [DELETE_USER]({ commit, dispatch, state }) {
    console.log('Estoy en deleteUser')
    commit('shared/CLEAR_ERROR', null, { root: true })
    await dispatch('GET_CREDENTIAL')
    let currentUser = firebaseAuth().currentUser
    let credential = state.credential
    console.log('myCredential es:' + credential)
    currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        dispatch('DELETE_FIREBASE_USER_ACCOUNT')
      })
      .catch(error => {
        console.log('DELETE_USER error: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  },

  /**
   * Recupera la credencial del usuario
   */
  [GET_CREDENTIAL]: ({ commit, state }) => {
    console.log('Estoy en getCredential')
    commit('shared/CLEAR_ERROR', null, { root: true })
    let currentUser = firebaseAuth().currentUser
    const idToken = currentUser.getIdToken()
    console.log('El idToken es: ' + idToken)
    const providerId = state.user.providerId
    if (providerId) {
      switch (providerId) {
        case 'facebook.com':
          console.log('el provider es: ' + providerId)
          const facebook = firebaseAuth.FacebookAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', facebook)
          break

        case 'google.com':
          console.log('el provider es: ' + providerId)
          const google = firebaseAuth.GoogleAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', google)
          break

        case 'twitter.com':
          console.log('el provider es: ' + providerId)
          const twitter = firebaseAuth.TwitterAuthProvider.credential(idToken)
          commit('SET_CREDENTIAL', twitter)
          break

        case 'password':
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
        commit('CLEAR_USER')
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
   * TODO: Fake User se utiliza en Dev para pruebas
   */
  [FAKE_USER]: () => {
    console.log('Estoy en FAKE_USER')
  },

  /**
   * Autoautenticación, el usuario ya está registrado
   *
   * @param {*} commit
   * @param {String} user - id y email del usuario
   */
  [AUTO_SIGN_IN]: ({ commit }, user) => {
    console.log('Estoy en AUTO_SIGN_IN')
    commit('shared/CLEAR_ERROR', null, { root: true })
    // const currentUser = firebaseAuth().currentUser
    const newUser = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      phone: user.phone,
      avatar: user.avatar,
      isVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      creationDate: user.creationTime,
      lastSignInDate: user.lastSignInTime,
      providerId: user.providerId
    }
    commit('SET_USER', newUser)
  },

  /**
   * Resetea el password del usuario
   *
   * @param {String} email - email del usuario
   */
  [RESET_PASSWORD]: ({ commit, dispatch }, email) => {
    console.log('Estoy en RESET_PASSWORD')
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('enviado password al email: ' + email)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
        console.log('error en RESET_PASSWORD: ' + error)
      })
  },

  /**
   * Confirmación del reseteo del password
   *
   * @param {String} code - codigo para poder resetear
   * @param {String} password - nuevo password
   */
  // TODO: Añadir los código de errores en locales
  [CONFIRM_RESET_PASSWORD]: ({ commit, dispatch }, { code, password }) => {
    console.log('Estoy en CONFIRM_RESET_PASSWORD')
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth()
      .confirmPasswordReset(code, password)
      .then(() => {
        console.log('Confirmado el reseteo del password')
      })
      .catch(error => {
        console.log('CONFIRM_RESET_PASSWORD error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * Verifica que el código de reseteo es válido
   *
   * @param {String} code Código de verificación
   */
  // TODO: Añadir los código de errores en locales
  [VERIFY_RESET_PASSWORD_CODE]: ({ commit, dispatch }, code) => {
    console.log('Estoy en VERIFY_RESET_PASSWORD_CODE')
    commit('shared/CLEAR_ERROR', null, { root: true })
    firebaseAuth()
      .verifyPasswordResetCode(code)
      .then(() => {
        console.log('verificado el código de reseteo del password')
      })
      .catch(error => {
        console.log('VERIFY_RESET_PASSWORD_CODE error: ' + error.message)
        commit('shared/SET_ERROR', null, { root: true })
        dispatch('errors/AUTH_ERROR', error.code, { root: true })
      })
  },

  /**
   * Actualizamos la información del usuario y la base de datos
   *
   * @param {*} commit
   * @param {*} state
   * @param {Object} user - datos del usuario para actualizar
   */
  [UPDATED_USER_INFO]: ({ commit, state }, user) => {
    console.log('Estoy en UPDATED_USER_INFO')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const userUpdated = {
      // userIcon: user.userIcon, // por el momento utilizar direcciones URL
      userName: user.userName,
      location: user.location // escribir una localidad, después utilizar geolocalización
      // preferences: user.preferences
    }
    // console.log(userUpdated)
    // commit('setUser', userUpdated)
    const userId = state.user.id
    // FIXME: Actualizamos los datos en Firebase Realtime Database
    firebaseDb
      .ref('users/' + userId)
      .update(userUpdated)
      .then(() => {
        console.log(
          'Actualizada en Firebase la base de datos del usuario: ' + user
        )
        // Actualizamos los datos en LokiJS
        // dispatch('localDataBase/updateUser', userUpdated, { root: true })
      })
      // TODO: revisar y actualizar errores
      .catch(error => {
        console.log('error en UPDATED_USER_INFO: ' + error)
        commit('shared/SET_ERROR', null, { root: true })
      })
  },

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
        // dispatch('localDataBase/CREATE_USER_LOCAL_DB', user, {
        //  root: true
        // })
        console.log(newUser.email)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log(error)
      })
  },Pioneer DDJ-400

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
  },

  /**
   * Comprueba si hay algún usuario conectado
   * Se utiliza a modo de test
   * ELIMINAR EN PRODUCCION
   */
  [IS_USER_ACTIVE]: ({ commit }) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
    const userActive = firebaseAuth().currentUser
    if (userActive != null) {
      console.log(userActive.displayName + ' está conectado')
    } else {
      console.log('No hay ningún usuario conectado')
      commit('shared/SET_ERROR', null, { root: true })
    }
  },

  /**
   * Mostramos los datos del usuario en formato JSON
   */
  [TO_JSON]: ({ state }) => {
    console.log('Dato del usuario: ' + state.user.lastSignInDate)
  }
}
