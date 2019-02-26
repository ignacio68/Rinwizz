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
    ]
  },
  getters: {
    socialButtons(state) {
      console.log('Estoy en getters.socialButtons')
      return state.socialButtons
    }
  },
  mutations: {},
  actions: {
    /**
     * Acciones para autenticar segun la red social elegida
     * Posibilidad de separarlo en módulos para mejorar la claridad
     * del software
     *
     * @param {*} index - Índice del array correspondiente a la red social
     */
    dispatchLogUp({ commit, dispatch, state }, index) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      const mySocialButtons = state.socialButtons
      let name = mySocialButtons[index].name
      console.log('la red social elegida es: ' + name)
      switch (name) {
        case 'Facebook': {
          const provider = new firebase.auth.FacebookAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Facebook')
          break
        }
        case 'Google': {
          const provider = new firebase.auth.GoogleAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Google')
          break
        }
        case 'Twitter': {
          const provider = new firebase.auth.TwitterAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Twitter')
          break
        }
      }
    },

    /**
     * Conecta con la red social elegida para la autenticación.
     *
     * @param {String} provider - Red Social utilizada
     */
    socialSignUp({ commit }, provider) {
      // provider.addScope('public_profile')
      firebase.auth().useDeviceLanguage()
      // NOTA: desarrollar un método para según el device elegir un método de acceso
      // firebase.auth().signInWithPopup(provider) // Utilizamos esta forma de acceso en producción en web
      firebase
        .auth()
        .signInWithRedirect(provider) // Utilizamos esta forma de acceso en móviles
        .then(() => {
          firebase
            .auth()
            .getRedirectResult()
            .then(result => {
              commit('shared/setLoading', false, { root: true })
              if (result.credential) {
                // Accedemos Access Token, ahora podemos utilizarlo para acceder a la API de la red social
                const token = result.credential.accessToken
                console.log('El token es: ' + token)
              }
              // Datos del nuevo usuario
              const newUser = {
                id: result.user.uid,
                email: result.user.email,
                name: result.user.displayName
              }
              commit('user/setUser', newUser, { root: true })
              console.log('El id del usuario es: ' + newUser.id)
              console.log('El email del usuario es: ' + newUser.email)
              console.log('El nombre del usuario es: ' + newUser.displayName)
            })
            .catch(error => {
              commit('shared/setLoading', false, { root: true })
              // commit('setError', error)
              let errorCode = error.code
              commit('errors/auth/authError', errorCode)
              console.log(errorCode)
            })
        })
    }
  }
}
