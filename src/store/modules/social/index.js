import { firebaseAuth } from '../../../firebase'

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
          const provider = new firebaseAuth.FacebookAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Facebook')
          break
        }
        case 'Google': {
          const provider = new firebaseAuth.GoogleAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          console.log('La red social elegida es Google')
          break
        }
        case 'Twitter': {
          const provider = new firebaseAuth.TwitterAuthProvider()
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
    socialSignUp({ commit, dispatch }, provider) {
      // provider.addScope('public_profile')
      firebaseAuth().useDeviceLanguage
      // NOTA: desarrollar un método para según el device elegir un método de acceso
      // firebase.auth().signInWithPopup(provider) // Utilizamos esta forma de acceso en producción en web
      firebaseAuth()
        .signInWithRedirect(provider) // Utilizamos esta forma de acceso en móviles
        .then(() => {
          firebaseAuth()
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
              dispatch('authErrors/authError', error.code, { root: true })
              console.log('socialSignUp error es: ' + error.code)
            })
        })
    }
  }
}
