import loki from 'lokijs'
import { db, userData } from '../../../loki'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,

  state: {},
  getters: {},
  mutations: {},
  actions: {
    createLocalUserDb (newUser) {
      // const user = db.addCollection('user')
      userData.insert({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        location: ''
      })
      console.log('estoy en createLocalUserDb')
      let userName
      userName = userData.get('name')
      console.log('el usuario es: ' + userName)
    },
    // REVISAR -- UTILIZAR USER/user
    updateUserEmail (userEmail) {
      userData.update({
        email: userEmail
      })
    },
    // REVISAR -- UTILIZAR USER/user
    updateUser (updateUser) {
      userData.update({
        name: updateUser.name,
        location: updateUser.location
      })
    },
    getUserData (data) {
      let userData
      userData = "'" + userData + "'"
      return db.getCollection(userData)
    },
    removeUser () {
      db.deleteDatabase()
    }
  }
}
