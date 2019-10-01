import { firebaseAuth, firebaseDb } from '@services/firebase'
import { createDb, fetchDoc, replyDb } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'
import { configSample, optionsSample } from '@utils/database'

import {
  SIGNUP_USER,
  SET_USER_PROFILE,
  SEND_EMAIL_VERIFICATION,
  APPLY_ACTION_CODE,
  LOGIN_USER,
  LOGOUT_USER,
  ON_AUTH_STATE_CHANGE,
  DELETE_USER,
  GET_CREDENTIAL,
  REAUTHENTICATE_USER,
  DELETE_FIREBASE_USER_ACCOUNT,
  AUTO_SIGN_IN,
  UPDATED_USER_PROFILE,
  IS_USER_ACTIVE,
  TO_JSON
} from '@store/types/actions_types'

import AppSplitter from '@pages/AppSplitter'
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
   * @param {Object} registeredUser - datos a añadir al nuevo usuario
   */

  // FIXME: desarrollar correctamente async y el catcher de errores.
  async [SIGNUP_USER]({ state, commit, dispatch }, registeredUser) {
    console.log('Estoy en SIGNUP_USER')
    // TODO: revisar SET ACTION PASS
    commit('shared/SET_ACTION_PASS', false, { root: true })
    commit('shared/CLEAR_ERROR', null, { root: true })
    /**
     * Crea el nuevo usuario en Firebase
     *
     * @param {String} registeredUser.email - email del usuario
     * @param {String} registeredUser.password - password del usuario
     */
    try {
      const result = await firebaseAuth().createUserWithEmailAndPassword(
        registeredUser.email,
        registeredUser.password
      )
      const { user } = result
      if (user) {
        console.log('Estoy en createUserWithEmailAndPassword')
        console.log(user)
        // TODO: Revisar
        commit('shared/SET_ACTION_PASS', true, { root: true })

        // Añadimos los datos del nuevo usuario
        const newUser = {
          id: user.uid,
          email: user.email,
          // password: registeredUser.password,
          name: registeredUser.name,
          phone: user.phoneNumber,
          isVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          avatar: user.photoURL,
          providerId: user.providerId,
          creationDate: user.metadata.creationTime,
          lastSignInDate: user.metadata.lastSignInTime
        }

        // Actualizamos el perfil de firebase con el displayName
        dispatch('SET_USER_PROFILE', { displayName: newUser.name })

        // Creamos al nuevo usuario en memoria
        commit('SET_USER', newUser)

        // Creamos la base de datos local de usuarios
        // const usersDb = createDb('users')
        // await commit('usersLocalDb/SET_LOCAL_DB', usersDb, { root: true })

        // creamos la base de datos local de usuario (PouchDB)
        await dispatch('usersLocalDb/CREATE_USER_LOCAL_DB', newUser, {
          root: true
        })

        // TODO: eliminar, utilizamos Cloudant
        // Añadimos los datos a la base de datos (Realtime Database)
        // await dispatch('userDb/CREATE_USER_DB', newUser, { root: true })

        console.log('Hay un nuevo usuario: ' + state.user.name)
        // Enviamos el email de confirmación
        const actionCodeSettings = state.actionCodeSettings
        dispatch('SEND_EMAIL_VERIFICATION', actionCodeSettings)
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
   * TODO: eliminar, utilizamos Cloudant
   *  Actualiza el perfil de usuario de Firebase
   * @param {object} user - datos del usuario a actualizar
   */

  async [SET_USER_PROFILE]({ commit, dispatch }, user) {
    commit('shared/CLEAR_ERROR', null, { root: true })
    console.log('Estoy en SET_USER_PROFILE')
    const userActive = await firebaseAuth().currentUser
    userActive
      .updateProfile(user)
      .then(() => {
        console.log('Se ha actualizado el perfil de: ' + user.displayName)
      })
      .catch(error => {
        commit('shared/SET_ERROR', null, { root: true })
        console.log('UPDATE PROFILE error: ' + error)
        dispatch('errors/AUTH_ERROR', 'auth/user-empty', { root: true })
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
  async [LOGIN_USER]({ commit, dispatch, rootState }, logInUser) {
    console.log('Estoy en signUserIn')
    commit('shared/CLEAR_ERROR', null, { root: true })
    // Comprueba que el usuario existe en Firebase
    try {
      const result = await firebaseAuth().signInWithEmailAndPassword(
        logInUser.email,
        logInUser.password
      )
      const { user } = result
      // Si existe el usuario recuperamos la información de la base de datos
      if (user) {
        console.log('LOGIN_USER user: ' + JSON.stringify(user))
        // const db = rootState.usersLocalDb
        // const db = commit('usersLocalDb/GET_USERS_LOCAL_DB', null, {
        //   root: true
        // })
        const db = await createDb('users')
        // console.log('db es: ' + JSON.stringify(db))
        // Establecemos la configuración
        const config = JSON.parse(JSON.stringify(configSample))
        config._id = user.uid
        config.dbName = 'users'
        config.remote = cloudantConfig.url + '/' + config.dbName
        console.log('La configuración es: ' + JSON.stringify(config))

        // Establecemos las opciones
        const options = JSON.parse(JSON.stringify(optionsSample))
        options.auth.username = authUsers.key
        options.auth.password = authUsers.password
        options.doc_ids.push(user.uid)
        console.log('Las opciones son: ' + JSON.stringify(options))

        // Replicamos y sincronizamos la base de datos
        await replyDb(db, config, options)

        const localUser = await fetchDoc(db, user.uid)
        commit('SET_USER', localUser)
        console.log('El user es: ' + JSON.stringify(localUser))

        // Lanzamos la página principal
        commit('navigator/REPLACE', AppSplitter, {
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
   * Autoautenticación, el usuario ya está registrado
   *
   * @param {String} user - id y email del usuario
   */
  // TODO: Revisar la utilización del user y newUser.
  async [AUTO_SIGN_IN]({ commit, dispatch }, user) {
    console.log('Estoy en AUTO_SIGN_IN')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      // const currentUser = firebaseAuth().currentUser
      // const authenticatedUser = {
      //   id: user.uid,
      //   // email: user.email,
      //   // name: user.displayName,
      //   phone: user.phone,
      //   // avatar: user.avatar,
      //   isVerified: user.emailVerified,
      //   // isAnonymous: user.isAnonymous,
      //   // creationDate: user.metadata.creationTime,
      //   lastSignInDate: user.metadata.lastSignInTime
      //   // providerId: user.providerId
      // }
      // Recuperamos la base de datos 'users'
      const usersDb = commit('usersLocalDb/GET_USERS_LOCAL_DB', null, {
        root: true
      })
      const userId = user.uid
      const localUser = await fetchDoc(usersDb, userId)
      commit('SET_USER', localUser)
      console.log('El user es: ' + JSON.stringify(localUser))
    } catch (error) {
      console.log('signUserUp error: ' + error)
      commit('shared/SET_ERROR', null, { root: true })
      commit('shared/SET_ACTION_PASS', false, { root: true })
    }
  },

  /**
   * Actualizamos la información del usuario y la base de datos
   *
   * @param {*} commit
   * @param {*} state
   * @param {Object} user - datos del usuario para actualizar
   */
  // TODO: repasar todo, actualizar base de datos
  [UPDATED_USER_PROFILE]: ({ commit, state }, user) => {
    console.log('Estoy en UPDATED_USER_PROFILE')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const userUpdated = {
      // userIcon: user.userIcon, // por el momento utilizar direcciones URL
      userName: user.userName
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
        console.log('error en UPDATED_USER_PROFILE: ' + error)
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
