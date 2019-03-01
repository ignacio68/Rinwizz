import firebase from 'firebase/app'
import 'firebase/auth'

import HomePage from '../../../pages/HomePage'
import SignUp from '../../../pages/User/SignUp'
// import fb from('../../../components/Firebase/firebaseConfig')

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,

  state: {
    user: null, // el usuario inicial siempre está vacio
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
     * Añade a user las propiedades del usuario registrado
     *
     * @param {*} state
     * @param {Object} newUser - Parámetros a añadir al usuario
     */
    setUser(state, newUser) {
      state.user = newUser
      console.log('Estoy en setUser')
      console.log('El nombre del usuario es: ' + state.user.name)
      console.log('El id del usuario es: ' + state.user._id)
      console.log('El email del usuario es: ' + state.user.email)
      console.log(state.user)
    },
    /**
     * Resetea el usuario
     *
     * @param {*} state
     */
    clearUser(state) {
      state.user = null
    }
  },
  actions: {
    /**
     * Nuevo usuario
     *
     * @param {*} commit
     * @param {*} dispatch
     * @param {Object} userDates - datos a añadir al nuevo usuario
     */
    signUpUser({ commit, dispatch }, userDates) {
      console.log('Estoy en signUserUp')
      commit('shared/setActionPass', false, {
        root: true
      })
      commit('shared/clearError', null, {
        root: true
      })
      /**
       * Crea el nuevo usuario en Firebase
       * prett
       * @param {String} userDates.email - email del usuario
       * @param {String} user.password - password del usuario
       */
      firebase
        .auth()
        .createUserWithEmailAndPassword(userDates.email, userDates.password)
        .then(firebaseUser => {
          console.log('Estoy dentro de createUserWithEmailAndPassword')
          console.log(firebaseUser)
          commit('shared/clearError', null, {
            root: true
          })
          commit('shared/setActionPass', true, {
            root: true
          })

          // Añadimos los datos del nuevo usuario
          let newUser = {
            _id: firebaseUser.user.uid,
            email: firebaseUser.user.email,
            name: userDates.name
          }

          // Llamamos a 'setUser' para añadir nuevas propiedades al user
          commit('setUser', newUser)
          console.log('Hay un nuevo usuario con id: ' + newUser._id)

          // Añadimos los datos a la base de datos (Realtime Database)
          // NOTA: Por el momento se desactiva
          // dispatch('createUserDb', newUser)
        })
        .catch(error => {
          console.log('Estoy en el catch de errores de signUserUp')
          commit('shared/setActionPass', false, {
            root: true
          })
          commit('shared/setError', error, {
            root: true
          })
        })
    },
    /**
     * Envía un email de confirmación de password
     *
     * @param {*} commit
     * @param {*} state
     * @param {String} firebaseUserEmail - email del usuario donde se le envía el mensaje de confirmación
     */
    confirmPassword({ commit, state }, firebaseUserEmail) {
      commit('shared/clearError', null, {
        root: true
      })
      console.log(
        'Estoy enviando el email de comprobacion de password a: ' +
          firebaseUserEmail
      )
      firebase
        .auth()
        .sendSignInLinkToEmail(firebaseUserEmail, state.actionCodeSettings)
        // REVISAR
        .then(() => {
          console.log('Guardo el email: ' + firebaseUserEmail + 'en email')
          // NOTA: Utilizar LokiJS para almacenar los datos
          // dispatch('localDataBase/updateUserEmail', firebaseUserEmail,  { root: true } )
        })
        .catch(error => {
          console.log('confirmPassword error')
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
        })
    },

    /**
     * Log In de Usuario existente
     *
     * @param {*} commit
     * @param {String} user
     */
    logInUser({ commit }, user) {
      commit('shared/setLoading', true, {
        root: true
      })
      commit('shared/clearError', null, {
        root: true
      })
      console.log('Estoy en signUserIn')
      /* Comprueba que el usuario existe en Firebase */
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(user => {
          console.log('signUserIn user')
          commit('shared/setLoading', false, {
            root: true
          })
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
          commit('navigator/push', HomePage, {
            root: true
          })
        })
        .catch(error => {
          console.log('logUserIn error')
          commit('shared/setLoading', false, {
            root: true
          })
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
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
      commit('shared/setLoading', true, {
        root: true
      })
      commit('shared/clearError', null, {
        root: true
      })
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
      firebase
        .database()
        .ref('users/' + userId)
        .update(userUpdated)
        .then(() => {
          commit('shared/setLoading', false, {
            root: true
          })
          console.log(
            'Actualizada en Firebase la base de datos del usuario: ' + user
          )
          // Actualizamos los datos en LokiJS
          dispatch('localDataBase/updateUser', userUpdated, {
            root: true
          })
        })
        .catch(error => {
          commit('shared/setLoading', false, {
            root: true
          })
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
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
      firebase
        .database()
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
      commit('shared/setLoading', true, {
        root: true
      })
      commit('shared/clearError', null, {
        root: true
      })
      console.log('Estoy en userNameDb')
      firebase
        .database()
        .ref('usersName/')
        .set({
          userName
        })
        .then(() => {
          commit('shared/setLoading', false, {
            root: true
          })
        })
        .catch(error => {
          commit('shared/setLoading', false, {
            root: true
          })
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
        })
    },

    /**
     * Log Out de Usuario
     *
     * @param {*} commit
     */
    signUserOut({ commit }) {
      commit('shared/setLoading', true, {
        root: true
      })
      commit('shared/clearError', null, {
        root: true
      })
      firebase
        .auth()
        .signOut()
        .then(result => {
          commit('shared/setLoading', false, {
            root: true
          })
          commit('shared/clearUser', null, {
            root: true
          })
        })
        .then(
          commit('navigator/push', SignUp, {
            root: true
          })
        )
        .catch(error => {
          commit('shared/setLoading', false, {
            root: true
          })
          commit('shared/setError', error, {
            root: true
          })
          console.log(error)
        })
    },

    /**
     * Comprueba si hay algún usuario conectado
     */
    isActiveUser() {
      const activeUser = firebase.auth().currentUser
      if (activeUser != null) {
        console.log(activeUser.email + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    }
  }
}
