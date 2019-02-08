/**
 * Todas las operaciones con la base de datos local
 * se ejecutan EXCLUSIVAMENTE desde aquí
 */
import loki from '@lokidb/loki'
import indexedStorage from '@lokidb/indexed-storage'
import { db, userData } from '../../../components/loki/lokiConfig'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,

  state: {},
  getters: {},
  mutations: {},
  actions: {
    createLocalUserDb (newUser) {
      console.log('estoy en createLocalUserDb')
      /*
      db.initializePersistence({
        env: 'CORDOVA',
        autoload: true,
        autosave: true,
        autosaveInterval: 4000,
        method: 'indexedStorage'
      }) */
      userData.insert({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        location: newUser.location
      })
      // userData.insert(newUser)
      if (!db.getCollection('userData')) {
        console.log('No existe la colección "userData"')
      } else {
        console.log('Existe la colección "userData"')
      }
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
      userData = "'" + data + "'"
      return db.getCollection(userData)
    },
    removeUser () {
      db.deleteDatabase()
    }
  }
}
