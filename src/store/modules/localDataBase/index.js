/**
 * Todas las operaciones con la base de datos local
 * se ejecutan EXCLUSIVAMENTE desde aquí
 */
import PouchDB from 'pouchdb'

const db = new PouchDB('rinwizz')

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,

  state: {
    dataToJSON: {}
  },
  getters: {},
  mutations: {
    toJSON (data) {
      function replacer (key, value) {
        // Filtrando propiedades 
        if (typeof value === 'string') {
          return '"' + value + '"'
        }
        return value
      }
      this.dataToJSON = JSON.stringify(data, replacer)
      return this.dataToJSON
    }
  },
  actions: {
    createLocalUserDb ({ commit }, newUser) {
      console.log('estoy en createLocalUserDb')
      // const newUserJSON = JSON.stringify(newUser)
      // Repasar, la solución no es muy convincente
      commit ('toJSON', newUser)
      db.put(this.dataToJSON)
      /*
      db.put({
         _id: new Date().toISOString(),
        "_id": '"' + newUser._id + '"',
        "userData": {
          "email": '"' + newUser.email + '"',
          "name": '"' + newUser.name + '"',
          "location": '"' + newUser.location + '"'
          }
        })*/.then((response) => {
        console.log('La info de la base de datos local es: ' + response)
        console.log(this.dataToJSON)
      }).catch((error) => {
        console.log('El error es: ' + error)
        console.log(newUser)
      })
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
      // let userData
      // userData = "'" + data + "'"
      return db.get(data)
    },
    removeUser () {
      db.deleteDatabase()
    }
  }
}
