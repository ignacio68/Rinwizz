import firebase from 'firebase/app'
import 'firebase/auth'

import HomePage from '../../../pages/HomePage'
import SignUp from '../../../pages/User/SignUp'
// const fb = require('../../../components/Firebase/firebaseConfig')

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
    user (state) {
      return state.user // devuelve el usuario desde state. ELIMINAR
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload // Añade a user las propiedades del usuario registrado
      console.log('Estoy en setUser')
      console.log('El nombre del usuario es: ' + state.user.name)
      console.log('El id del usuario es: ' + state.user.id)
      console.log('El email del usuario es: ' + state.user.email)
      console.log(state.user)
    },
    clearUser (state) {
      state.user = null // resetea el user
    }
  },
  actions: {
    /**
    * Nuevo Usuario
    */
    signUpUser ({ commit, dispatch }, payload) {
      console.log('Estoy en signUserUp')
      commit('shared/setLoading', true, { root: true })
      commit('shared/setActionPass', false, { root: true })
      commit('shared/clearError', null, { root: true })

      /* Crea el nuevo usuario en Firebase */
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          firebaseUser => {
            console.log('Estoy dentro de createUserWithEmailAndPassword')
            console.log(firebaseUser)
            commit('shared/setLoading', false, { root: true })
            commit('shared/clearError', null, { root: true })
            commit('shared/setActionPass', true, { root: true })
            const newUser = {
              // Añadimos los datos del nuevo usuario
              id: firebaseUser.user.uid,
              email: firebaseUser.user.email,
              name: payload.userName
            }
            commit('setUser', newUser) // Llamamos a 'setUser' para añadir nuevas propiedades al user
            console.log('Hay un nuevo usuario: ' + newUser.name)
            dispatch('createUserDb', newUser) // Añadimos los datos a la base de datos (Realtime Database)
          }
        )
        .catch(
          error => {
            console.log('Estoy en el catch de errores de signUserUp')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setActionPass', false, { root: true })
            commit('shared/setError', error, { root: true })
          }
        )
    },

    /**
    * Envía un email de confirmación de password
    */
    confirmPassword ({ commit, state }, firebaseUserEmail) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy enviando el email de comprobacion de password a: ' + firebaseUserEmail)
      firebase.auth().sendSignInLinkToEmail(firebaseUserEmail, state.actionCodeSettings)
        .then(
          () => {
            console.log('Guardo el email: ' + firebaseUserEmail + ('en email'))
            commit('shared/setLoading', false, { root: true })
            window.localStorage.setItem('email', firebaseUserEmail)
            /* NativeStorage.setItem('emailForSingIn', firebaseUserEmail)
              .then((result) => {
                console.log('emailForSingIn es: ' + result)
              }, (error) => {
                console.log(error)
              }) */
          }
        )
        .catch(
          error => {
            console.log('confirmPassword error')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setError', error, { root: true })
            console.log(error)
          }
        )
    },

    /**
    * Log In de Usuario
    */
    logInUser ({ commit }, user) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy en signUserIn')
      /* Comprueba que el usuario existe en Firebase */
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            console.log('signUserIn user')
            commit('shared/setLoading', false, { root: true })
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            commit('navigator/push', HomePage, { root: true })
          }
        )
        .catch(
          error => {
            console.log('logUserIn error')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setError', error, { root: true })
            console.log(error)
          }
        )
    },

    /**
    * Autoautenticación, el usuario ya está registrado
    */
    autoSignIn ({ commit }, user) {
      console.log('Estoy en autoSignIn')
      commit('setUser', {
        id: user.uid,
        email: user.email
      })
    },

    /**
    * Actualizamos la información del usuario y la base de datos
    */
    updatedUserInfo ({ commit, state }, user) {
      console.log('Estoy en updatedUserInfo')
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
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
      firebase.database().ref('users/' + userId).update(userUpdated)
        .then(() => {
          commit('shared/setLoading', false, { root: true })
          console.log('Actualizada en Firebase la base de datos del usuario: ' + user)
          // Actualizamos los datos en Local Storage
          window.localStorage.setItem('userName', user.userName)
          window.localStorage.setItem('location', user.location)
        })
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    },

    /**
    * Creamos la base de datos del usuario
    */
    createUserDb ({ commit }, newUser) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy en createUserDb')
      // console.log(newUser)
      /* const user = {
        email: newUser.email
      } */
      const userId = newUser.id
      console.log('el id del usuario es: ' + userId)
      firebase.database().ref('users/' + userId).set({ email: newUser.email, name: newUser.name })
        .then(() => {
          commit('shared/setLoading', false, { root: true })
          // Actualizamos los datos en Local Storage
          // NOTA: Actualizar a indexDb
          // NOTA: crear base de datos
          window.localStorage.setItem('id', userId)
          window.localStorage.setItem('email', newUser.email)
          window.localStorage.setItem('userName', newUser.name)
          window.localStorage.setItem('location', '')
          console.log(newUser.email)
        })
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    },

    /**
    * Log Out de Usuario
    */
    signUserOut ({ commit }) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      firebase.auth().signOut()
        .then(
          result => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/clearUser', null, { root: true })
          }
        )
        .then(
          commit('navigator/push', SignUp, { root: true })
        )
        .catch(
          error => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/setError', error, { root: true })
            console.log(error)
          }
        )
    },

    /**
    * Comprueba si hay algún usuario conectado
    */
    isActiveUser ({ commit }) {
      const activeUser = firebase.auth().currentUser
      if (activeUser != null) {
        console.log(activeUser.email + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    }
  }
}
