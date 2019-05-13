import { firebaseAuth } from '../../../firebase'

import { DISPATCH_SIGNUP, SOCIAL_SIGNUP } from '@store/types/actions_types'

export default {
  /**
   * Acciones para autenticar segun la red social elegida
   * Posibilidad de separarlo en módulos para mejorar la claridad
   * del software
   *
   * @param {*} index - Índice del array correspondiente a la red social
   */
  [DISPATCH_SIGNUP]: ({ commit, dispatch, state }, index) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
    const socialButtons = state.socialButtons
    let name = socialButtons[index].name
    console.log('la red social elegida es: ' + name)
    switch (name) {
      case 'Facebook': {
        const provider = new firebaseAuth.FacebookAuthProvider()
        // provider.addScope()
        dispatch('SOCIAL_SIGNUP', provider)
        console.log('La red social elegida es Facebook')
        break
      }
      case 'Google': {
        const provider = new firebaseAuth.GoogleAuthProvider()
        // provider.addScope()
        dispatch('SOCIAL_SIGNUP', provider)
        console.log('La red social elegida es Google')
        break
      }
      case 'Twitter': {
        const provider = new firebaseAuth.TwitterAuthProvider()
        // provider.addScope()
        dispatch('SOCIAL_SIGNUP', provider)
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
  [SOCIAL_SIGNUP]: ({ commit, dispatch }, provider) => {
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
            commit('user/SET_USER', newUser, { root: true })
            console.log('El id del usuario es: ' + newUser.id)
            console.log('El email del usuario es: ' + newUser.email)
            console.log('El nombre del usuario es: ' + newUser.displayName)
          })
          .catch(error => {
            commit('shared/SET_ERROR', error)
            dispatch('errors/AUTH_ERROR', error.code, { root: true })
            console.log('SOCIAL_SIGNUP error es: ' + error.code)
          })
      })
  }
}
