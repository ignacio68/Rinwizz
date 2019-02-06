import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    socialButtons: [
      {
        name: 'Facebook',
        color: '#3b5998',
        icons: 'ion-social-facebook-outline, material:md-facebook-box'
      },
      {
        name: 'Google+',
        color: '#d62d20',
        icons: 'ion-social-google-outline, material:md-google'
      },
      {
        name: 'Twitter',
        color: '#0084b4',
        icons: 'ion-social-twitter-outline, material:md-twitter'
      }
    ],
    errorMessage: ''
  },
  getters: {
    socialButtons (state) {
      console.log('Estoy en getters.socialButtons')
      return state.socialButtons
    }
  },
  mutations: {
    /**
     * Manejo de los errores de autenticación
     * Terminar de completar, internacionalizar y sacar a otro módulo
      */
    authError (state, errorCode) {
      switch (errorCode) {
        case 'auth/credential-already-in-use' :
          state.message = 'Ya existe un usuario con esta cuenta'
          break
        case 'auth/email-already-in-use' :
          state.message = 'Ya existe un usuario con el mismo email'
          break
        case 'auth/operation-not-allowed' :
          state.message = 'Este tipo de cuentas no esta habilitada'
          break
        default :
          state.message = errorCode
      }
      console.log('el error en la autorización es:' + state.message)
    }
  },
  actions: {
    /**
     * Acciones para autenticar segun la red social elegida
     * Posibilidad de separarlo en módulos para mejorar la claridad
     * del software
     */

    // Selecciona la red social elegida por el usuario
    dispatchLogUp ({ commit, dispatch, state }, index) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      const mySocialButtons = state.socialButtons
      let name = mySocialButtons[index].name
      console.log('la red social elegida es: ' + name)
      switch (name) {
        case 'Facebook' : {
          const provider = new firebase.auth.FacebookAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Facebook')
          break
        }
        case 'Google' : {
          const provider = new firebase.auth.GoogleAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Google')
          break
        }
        case 'Twitter' : {
          const provider = new firebase.auth.TwitterAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Twitter')
          break
        }
      }
    },

    // SignUp - Conecta con la red social elegida para la autenticación.
    socialSignUp ({ commit }, provider) {
      // provider.addScope('public_profile')
      firebase.auth().useDeviceLanguage()
      // firebase.auth().signInWithPopup(provider) // Utilizamos esta forma de acceso en producción en web
      firebase.auth().signInWithRedirect(provider) // Utilizamos esta forma de acceso en móviles
        .then(() => {
          firebase.auth().getRedirectResult()
            .then(result => {
              commit('shared/setLoading', false, { root: true })
              if (result.credential) {
                // Accedemos al Facebook Access Token, ahora podemos utilizarlo para acceder a la Facebook API
                const token = result.credential.accessToken
                console.log('El token es: ' + token)
              }
              // Informacion del usuario
              const newUser = {
                id: result.user.uid
              }
              commit('user/setUser', newUser, { root: true })
              console.log(newUser.id)
            })
            .catch(error => {
              commit('shared/setLoading', false, { root: true })
              // commit('setError', error)
              let errorCode = error.code
              commit('authError', errorCode)
              console.log(errorCode)
            })
        })
    }
  }
}
