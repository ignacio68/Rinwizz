import { firebaseAuth, firebaseDb, currentUser, firebase } from '../../../firebase'

import HomePage from '../../../pages/HomePage'
// timport SignUp from '../../../pages/User/SignUp'
import LogIn from '../../../pages/User/LogIn'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,

  state: {
    user: null,
    credential: '',
    /**
     * Creamos el objeto ActionCodeSettings que proporciona instrucciones a Firebase
     * para comunicarse por email con el usuario
     */
    actionCodeSettings: {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://www.lopezamor.com',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
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
     * Establece la crdencial del usuario
     */
    setCredential(state, credential) {
      state,credential = credential
    }
  },
  actions: {
    /**
     * Nuevo usuario
     *
     * @param {*} commit
     * @param {*} dispatch
     * @param {Object} registerUser - datos a añadir al nuevo usuario
     */
    signUpUser({ commit, dispatch }, registerUser) {
      console.log('Estoy en signUserUp')
      commit('shared/setActionPass', false, { root: true })
      /**
       * Crea el nuevo usuario en Firebase
       * prett
       * @param {String} registerUser.email - email del usuario
       * @param {String} registerUser.password - password del usuario
       */
      firebaseAuth
        .createUserWithEmailAndPassword(registerUser.email, registerUser.password)
        .then(firebaseUser => {
          console.log('Estoy dentro de createUserWithEmailAndPassword')
          console.log(firebaseUser)
          commit('shared/setActionPass', true, { root: true })

          // Añadimos los datos del nuevo usuario
          let newUser = {
            _id: firebaseUser.user.uid,
            email: firebaseUser.user.email,
            name: registerUser.name
          }

          // Llamamos a 'setUser' para crear el nuevo usuario localmente
          commit('setUser', newUser)
          console.log('Hay un nuevo usuario con id: ' + newUser._id)

          // Añadimos los datos a la base de datos (Realtime Database)
          // NOTA: Por el momento se desactiva
          // dispatch('createUserDb', newUser)
        })
        .catch(error => {
          console.log('signUserUp error: ' + error)
          commit('shared/setActionPass', false, { root: true })
        })
    },

    /**
     * Log In de usuario existente
     *
     * @param {*} commit
     * @param {String} user
     */
    logInUser({ commit }, user) {
      console.log('Estoy en signUserIn')
      /* Comprueba que el usuario existe en Firebase */
      firebaseAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(user => {
          console.log('signUserIn user')
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
          commit('navigator/push', HomePage, {
            root: true
          })
        })
        .catch(error => {
          console.log('logUserIn error: ' + error)
        })
    },
    
    /**
     * Log Out de Usuario
     *
     * @param {*} commit
     */
    logOutUser({ commit }) {
      firebaseAuth
        .signOut()
        .then(result => {
          commit('clearUser')
          console.log(result)
        })
        .then(
          commit('navigator/push', LogIn, { root: true })
        )
        .catch(error => {
          console.log('signUserOut error: ' + error)
        })
    },
    
    /**
     * Ponemos un observador
     */
    onAuthStateChanges() {
      firebaseAuth.onAuthstateChange((user) => {
        if (user) {
          console.log (user)
        }
      })
    },

    /**
     * Elimina el usuario
     */
    deleteUser ({ dispatch }) {
      console.log('Estoy en deleteUser')
      dispatch('getCredential')
    },

    /**
     * Recupera la credencial del usuario
     */
    getCredential ({ commit }) {
      console.log('Estoy en getCredential')
      let providerId = firebaseAuth.currentUser.providerData[0].providerId
      console.log("el provider es: " + providerId)
      if ( firebaseAuth.OAuthProvider === undefined ) {
        console.log('emailAuthProvider NO está definido')
      } else {
        console.log('emailAuthProvider SI está definido')
      }
      /*
      if (providerId === 'password') {
        let credential = firebaseAuth.EmailAuthProvider.credential(email, password)
        return credential
        console.log("la credencial es: " + credential)
      } else {
        console.log("el provider es 0Auth ")
      }
      */
      /*
      switch (providerId) {
        case "facebook.com":
          console.log ("el provider es: " + providerId)
          break

        case "google.com":
          console.log ("el provider es: " + providerId)
          break
        
        case "twitter.com":
          console.log ("el provider es: " + providerId)
          break

        case "password":
          console.log ("el provider es: " + providerId)
          break
      }*/
    },

    /**
     * Resuténticiòn del usuario
     * Se utiliza para poder elimnar la cuenta de usuario
     */
    reauthenticateUser ({ state, dispatch }) {
      console.log('Estoy en reauthenticateUser')
      const user = firebaseAuth.currentUser
      dispatch(`getCredential`)
      let myCredential = state.credential
      user.reauthenticateAndRetrieveDataWithCredential(myCredential)
        .then(() =>{
          dispatch('deleteUser')
          console.log('Usuario eliminado')
        })
        .catch((error) => {
          console.log('reauthenticateUser error: ' + error)
        })
    },

    /**
     * Elimina la cuenta de usuario de Firebase
     */
    deleteFirebaseUserAccount () {
      console.log('Estoy en deleteFirebaseUserAccount')
      const user = firebaseAuth.currentUser
      // dispatch('getCredential')
      user
        .delete()
        .then(() => {
          console.log ('Usuario eliminado')
          commit('clearUser')
          dispatch('signUserOut')
        })
        .catch((error) => {
          console.log('deleteUser error: ' + error)
        })
    },
   
    /**
     * Fake User se utiliza en Dev para pruebas
     */
    fakeUser () {
      console.log('Estoy en Fake User')
    },

    /**
     * Envía un email de confirmación de password
     *
     * @param {*} commit
     * @param {*} state
     * @param {String} firebaseUserEmail - email del usuario donde se le envía el mensaje de confirmación
     */
    confirmPassword({ commit, state }, firebaseUserEmail) {
      console.log(
        'Estoy enviando el email de comprobacion de password a: ' +
          firebaseUserEmail
      )
      firebaseAuth
        .sendSignInLinkToEmail(firebaseUserEmail, state.actionCodeSettings)
        // REVISAR
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
        email: user.email
      })
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
      // Actualizamos los datos en Firebase Realtime Database
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
     * NOTA: Refinar para hacer la comprobación en el server
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
     * NOTA: REVISAR
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
          console.log('Añadido el nombre de usuario a la base de datos "UserNames"')
        })
        .catch(error => {
          console.log('userNameDb error: ' + error)
        })
    },

    /**
     * Comprueba si hay algún usuario conectado
     */
    isActiveUser() {
      const activeUser = FirebaseAuth.currentUser
      if (activeUser != null) {
        console.log(activeUser.displayName + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    }
  }
}
