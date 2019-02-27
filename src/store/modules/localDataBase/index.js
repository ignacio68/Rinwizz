/**
 * ----- REVISAR A FONDO ------
 *
 * Todas las operaciones con la base de datos local
 * se ejecutan EXCLUSIVAMENTE desde aquí
 */
import PouchDB from 'pouchdb'

const db = new PouchDB('rinwizz')

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  // db: new PouchDB('rinwizz'),

  state: {
    dataToJSON: {},
    userData: {} // dummy userData
  },
  getters: {},
  mutations: {
    /* toJSON (data) {
      function replacer (key, value) {
        // Filtrando propiedades
        if (typeof value === 'string') {
          return '"' + value + '"'
        }
        return value
      }
      this.dataToJSON = JSON.stringify(data, replacer)
      return this.dataToJSON
    } */
  },
  actions: {
    /**
     * Crea la base de datos local del usuario
     *
     * @param {Object} newUser  Datos del usuario
     */
    createLocalUserDb(newUser) {
      console.log('estoy en createLocalUserDb')
      // const newUserJSON = JSON.stringify(newUser)
      // Repasar, la solución no es muy convincente
      // commit ('toJSON', newUser)
      // db.put(this.dataToJSON)
      db.put({
        // _id: new Date().toISOString(),
        _id: '"' + newUser._id + '"',
        userData: {
          email: '"' + newUser.email + '"',
          name: '"' + newUser.name + '"',
          location: '"' + newUser.location + '"'
        }
      })
        .then(response => {
          console.log('La info de la base de datos local es: ' + response)
          console.log(this.dataToJSON)
        })
        .catch(error => {
          console.log('El error es: ' + error)
          console.log(newUser)
        })
    },
    /**
     * Actualiza el email del usuario en la base de datos local
     *
     * @param {String} userEmail Email del usuario
     */
    // REVISAR -- UTILIZAR USER/user
    updateUserEmail(userEmail) {
      this.userData.update({
        email: userEmail
      })
    },
    /**
     *
     * @param {Object} updateUser  Actualiza el usuario de la base de datos local
     */
    // REVISAR -- UTILIZAR USER/user
    updateUser(updateUser) {
      this.userData.update({
        name: updateUser.name,
        location: updateUser.location
      })
    },

    /**
     * Recupera los datos del usuario de la base de datos local
     *
     * @param {Object} data Dato del usuario solicitado
     * @returns {String} Devuelve el dato del usuario solicitado
     */
    getUserData(data) {
      // let userData
      // userData = "'" + data + "'"
      return db.get(data)
    },

    /**
     * Elimina el usuario de la base de datos local
     */
    removeUser() {
      db.deleteDatabase()
    }
  }
}
