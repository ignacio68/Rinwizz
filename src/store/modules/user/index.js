import { firebaseAuth, firebaseDb } from '../../../firebase'

import HomePage from '../../../pages/HomePage'
import Welcome from '../../../pages/Shared/Welcome'
import LogIn from '../../../pages/User/LogIn'

// const currentUser = firebaseAuth().currentUser

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    user: null,
    credential: {},
    /**
     * Creamos el objeto ActionCodeSettings que proporciona instrucciones a Firebase
     * para comunicarse por email con el usuario
     */
    actionCodeSettings: {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://localhost:8080',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.rinwizz.ios'
      },
      android: {
        packageName: 'com.rinwizz.android',
        installApp: true,
        minimumVersion: '19'
      }
    }
  },
  getters: {
    /**
     * Devuelve el usuario desde state. ELIMINAR
     *
     * @param {*} state
     */
    user(state) {
      return state.user
    }
  },
  mutations: {
    /**
     * Crea un nuevo usuario
     *
     * @param {*} state
     * @param {Object} newUser - Parámetros a añadir al usuario
     */
    setUser(state, newUser) {
      state.user = newUser
    },
    /**
     * Resetea el usuario
     *
     * @param {*} state
     */
    clearUser(state) {
      state.user = null
    },
    /**
     * Establece la credencial del usuario
     */
    setCredential(state, credential) {
      state.credential = credential
      console.log('credential es: ' + credential)
    }
  },
  /**
   * TODO:
   * 1. Convertir todas las acciones con firebasea async/await
   * 2. El resto de acciones convertirlas en Promise
   * 3. Desarrollar la acción authError en el módulo "errors/auth"
   */
  actions: {
    /**
     * Nuevo usuario
     *
     * @param {*} commit
     * @param {*} dispatch
     * @param {Object} registerUser - datos a añadir al nuevo usuario
     */

    // FIXME: desarrollar correctamente async y el catcher de errores.
    async signUpUser ({ commit, dispatch, state }, registerUser) {
      console.log('Estoy en signUserUp')
      commit('shared/setActionPass', false, { root: true })
      commit('shared/clearError', null, { root: true })
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
          commit('shared/setActionPass', true, { root: true })

          // Añadimos los datos del nuevo usuario
          const newUser = {
            id: user.uid,
            email: user.email,
            password: registerUser.password,
            name: registerUser.name,
            phone: user.phoneNumber,
            isVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            avatar: user.photoURL,
            providerData: user.providerData,
            providerId: user.providerData[0].providerId,
            creationDate: user.metadata.creationTime,
            lastSignInDate: user.metadata.LastSignInTime
          }
          // Llamamos a 'setUser' para crear el nuevo usuario localmente
          commit('setUser', newUser)
          console.log('Hay un nuevo usuario: ' + state.user.name)
          console.log('Password: ' + state.user.password)
          console.log('Se unió el: ' + state.user.creationDate)
          console.log('El provider es: ' + state.user.providerId)
          // Enviamos el email de confirmación
          const actionCodeSettings = state.actionCodeSettings
          dispatch('sendEmailVerification', actionCodeSettings)
          // Añadimos los datos a la base de datos (Realtime Database)
          // FIXME: Por el momento se desactiva
          // dispatch('createUserDb', newUser)
        } else {
          dispatch('authErrors/authError', 'auth/user-empty', { root: true })
        }
      } catch (error) {
        console.log('signUserUp error: ' + error.message)
        dispatch('authErrors/authError', error.code, { root: true })
        commit('shared/setActionPass', false, { root: true })
      }
    },

    /**
     * Enviamos un email de confirmación de la cuenta de usuario
     *
     * @param {Object} actionCodeSettings - parametros necesarios para enviar el email de confirmación
     */
    sendEmailVerification({ state, commit, dispatch }, actionCodeSettings) {
      console.log('Estoy en sendEmailVerification')
      commit('shared/clearError', null, { root: true })
      const currentUser = firebaseAuth().currentUser
      if (currentUser) {
        currentUser
          .sendEmailVerification(actionCodeSettings)
          .then(() => {
            console.log('email enviado')
          })
          .catch(error => {
            dispatch('authErrors/authError', error.code, { root: true })
        })
      } else {
        dispatch('authErrors/authError', 'auth/user-empty', { root: true })
      }
    },

    applyActionCode({state, commit, dispatch}, code) {
      console.log('Estoy en sendEmailVerification')
      commit('shared/clearError', null, { root: true })
      firebaseAuth.applyActionCode(code)
        .then(() => {
          console.log('codigo de verificación')
        })
        .catch(error => {
          // TODO: Revisar los codigos de error y añadir a locales
          dispatch('authErrors/authError', error.code, { root: true })
      })
    },

    /**
     * Log In de usuario existente
     *
     * @param {*} commit
     * @param {String} user
     */
    async logInUser({ state, commit, dispatch }, logInUser) {
      console.log('Estoy en signUserIn')
      commit('shared/clearError', null, { root: true })
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
          commit('setUser', newUser)
          commit('navigator/replace', HomePage, {
            root: true
          })
        }
      } catch (error) {
        console.log('logUserIn error: ' + error.message)
        dispatch('authErrors/authError', error.code, { root: true })
      }
    },

    /**
     * Log Out de Usuario
     *
     * @param {*} commit
     */
    logOutUser({ commit }) {
      firebaseAuth().signOut()
        .then(result => {
          commit('clearUser')
          console.log(result)
        })
        .then(commit('navigator/push', LogIn, { root: true }))
        .catch(error => {
          console.log('signUserOut error: ' + error)
        })
    },

    /**
     * Ponemos un observador
     */
    onAuthStateChange() {
      firebaseAuth().onAuthstateChange(user => {
        if (user) {
          console.log(user)
        }
      })
    },

    /**
     * Elimina el usuario
     */
    async deleteUser({ dispatch, state }) {
      console.log('Estoy en deleteUser')
      await dispatch(`getCredential`)
      let currentUser = firebaseAuth().currentUser
      let credential = state.credential
      console.log('myCredential es:' + credential)
      currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          dispatch('deleteFirebaseUserAccount')
        })
        .catch(error => {
          console.log('reauthenticateUser error: ' + error)
        })
    },

    /**
     * Recupera la credencial del usuario
     */
    getCredential({ commit, state }) {
      console.log('Estoy en getCredential')
      let currentUser = firebaseAuth().currentUser
      const idToken = currentUser.getIdToken()
      console.log('El idToken es: ' + idToken)
      const providerId = state.user.providerId

      switch (providerId) {
        case 'facebook.com':
          console.log('el provider es: ' + providerId)
          const facebook = firebaseAuth.FacebookAuthProvider.credential(idToken)
          commit('setCredential', facebook)
          break

        case 'google.com':
          console.log('el provider es: ' + providerId)
          const google = 'google'
          commit('setCredential', google)
          break

        case 'twitter.com':
          console.log('el provider es: ' + providerId)
          const twitter = 'twitter'
          commit('setCredential', twitter)
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
          commit('setCredential', password)
          break

        default:
          console.log('No hay providerId: ' + providerId)
      }
    },

    /**
     * Reautenticación automática del usuario
     * Se utiliza para poder elimnar la cuenta de usuario
     */
    reauthenticateUser({ state, dispatch }) {
      console.log('Estoy en reauthenticateUser')
      const currentUser = firebaseAuth().currentUser
      let credential = state.credential
      currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          dispatch('deleteFirebaseUserAccount')
        })
        .catch(error => {
          console.log('reauthenticateUser error: ' + error)
        })
    },

    /**
     * Elimina la cuenta de usuario de Firebase
     */
    deleteFirebaseUserAccount({ commit }) {
      console.log('Estoy en deleteFirebaseUserAccount')
      const currentUser = firebaseAuth().currentUser
      // dispatch('getCredential')
      currentUser
        .delete()
        .then(() => {
          console.log('Usuario eliminado')
          commit('clearUser')
          commit('navigator/replace', Welcome, {
            root: true
          })
        })
        .catch(error => {
          console.log('deleteUser error: ' + error)
        })
    },

    /**
     * Fake User se utiliza en Dev para pruebas
     */
    fakeUser() {
      console.log('Estoy en Fake User')
    },

    /**
     * Envía un email de confirmación de password
     *
     * @param {*} commit
     * @param {*} state
     * @param {String} firebaseUserEmail - email del usuario donde se le envía el mensaje de confirmación
     */
    confirmPassword({ state }, firebaseUserEmail) {
      console.log(
        'Estoy enviando el email de comprobacion de password a: ' +
          firebaseUserEmail
      )
      firebaseAuth()
        .sendSignInLinkToEmail(firebaseUserEmail, state.actionCodeSettings)
        // TODO: REVISAR
        .then(() => {
          console.log('Guardo el email: ' + firebaseUserEmail + 'en email')
          // NOTA: Utilizar LokiJS para almacenar los datos
          // dispatch('localDataBase/updateUserEmail', firebaseUserEmail,  { root: true } )
        })
        .catch(error => {
          console.log('confirmPassword error: ' + error)
        })
    },

    /**
     * Autoautenticación, el usuario ya está registrado
     *
     * @param {*} commit
     * @param {String} user - id y email del usuario
     */
    autoSignIn({ commit }, user) {
      console.log('Estoy en autoSignIn')
      commit('setUser', {
        id: user.uid,
        email: user.email,
        isVerified: user.emailVerified,
        creationDate: user.metadata.creationTime,
        lastSignInDate: user.metadata.LastSignInTime
      })
    },

    /**
     * Resetea el password del usuario
     *
     * @param {String} email - email del usuario
     */
    resetPassword({ state, commit, dispatch }, email) {
      console.log('resetPassword')
      commit('shared/clearError', null, { root: true })
      firebaseAuth()
        .sendPasswordResetEmail(email).then(() => {
          console.log('enviado password al email: ' + email)
        })
        .catch(error => {
          dispatch('authErrors/authError', error.code, { root: true })
          console.log('resetPassword: ' + error)
        })
    },

    /**
     * Confirmación del reseteo del password
     *
     * @param {String} code - codigo para poder resetear
     * @param {String} password - nuevo password
     */
    // TODO: Añadir los código de errores en locales
    confirmPasswordReset({ state, commit, dispatch }, { code, password }) {
      console.log('confirmPasswordReset')
      commit('shared/clearError', null, { root: true })
      firebaseAuth()
        .confirmPasswordReset(code, password).then(() => {
          console.log('Confirmado el reseteo del password')
        })
        .catch(error => {
          console.log('confirmPasswordReset error: ' + error.message)
          dispatch('authErrors/authError', error.code, { root: true })
        })
    },

    /**
     * Verifica que el código de reseteo es válido
     * 
     * @param {String} code Código de verificación
     */
    // TODO: Añadir los código de errores en locales
    verifyPasswordResetCode({ state, commit, dispatch }, code) {
      console.log('verifyPasswordResetCode')
      commit('shared/clearError', null, { root: true })
      firebaseAuth().verifyPasswordResetCode(code)
        .then(() => {
          console.log('verificado el código de reseteo del password')
        })
        .catch(error => {
          console.log('verifyPasswordResetCode error: ' + error.message)
          dispatch('authErrors/authError', error.code, { root: true })
        })
    },

    // TODO: desarrollar los updates
    updateEmail(email) {
      
    },

    updatePassword(password) {

    },
    
    updateProfile({ displayName, photoURL }) {
      
    },

    /**
     * Actualizamos la información del usuario y la base de datos
     *
     * @param {*} commit
     * @param {*} state
     * @param {Object} user - datos del usuario para actualizar
     */
    updatedUserInfo({ commit, state }, user) {
      console.log('Estoy en updatedUserInfo')
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
        .catch(error => {
          console.log('updatedUserInfo: ' + error)
        })
    },

    /**
     * Creamos la base de datos del usuario
     *
     * @param {*} commit
     * @param {*} dispatch
     * @param {Object} newUser - datos del usuario
     */
    createUserDb({ commit, dispatch }, newUser) {
      commit('shared/clearError', null, {
        root: true
      })
      console.log('Estoy en createUserDb')
      const userId = newUser._id
      console.log('el id del usuario es: ' + userId)
      firebaseDb
        .ref('users/' + userId)
        .set({
          email: newUser.email,
          name: newUser.name
        })
        .then(() => {
          // Añade el nombre de usuario a la base de datos
          dispatch('userNameDb', newUser.name)
          // Actualizamos los datos en Local Storage (LokiJS)
          dispatch('localDataBase/createLocalUserDb', newUser, {
            root: true
          })
          console.log(newUser.email)
        })
        .catch(error => {
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
        })
    },

    /**
     * Comprueba que el nombre de usuario no existe en la base de datos
     * de nombre de usuarios -> /usersNames
     *
     * TODO: Hacer la comprobación en el server
     *       no en el cliente
     *
     * @param {*} dispatch
     * @param {String} userName
     */
    checkUserName({ dispatch }, userName) {
      console.log('Estoy en checkUserName')
      dispatch('signUpUser', userName)
    },

    /**
     *
     * Añade el nombre la base de datos /usersNames
     * TODO: REVISAR
     *
     * @param {*} commit
     * @param {String} userName
     */
    userNameDb({ commit }, userName) {
      console.log('Estoy en userNameDb')
      firebaseDb
        .ref('usersName/')
        .set({
          userName
        })
        .then(() => {
          console.log(
            'Añadido el nombre de usuario a la base de datos "UserNames"'
          )
        })
        .catch(error => {
          console.log('userNameDb error: ' + error)
        })
    },

    /**
     * Comprueba si hay algún usuario conectado
     */
    isActiveUser() {
      let activeUser = firebaseAuth().currentUser
      if (activeUser != null) {
        console.log(activeUser.displayName + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    },

    /**
     * Mostramos los datos del usuario en formato JSON
     */
    toJSON({ state }) {
      let currentUser = firebaseAuth().currentUser
      const userDato = currentUser.toJSON()
      console.log('Dato del usuario: ' + state.user.lastSignInDate)
    }
  }
}
