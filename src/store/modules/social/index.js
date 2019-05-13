import getters from './getters'
import actions from './actions'

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
  getters,
  mutations: {},
  actions
}
