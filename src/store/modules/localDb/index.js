/**
 * ----- REVISAR A FONDO ------
 *
 * Todas las operaciones con la base de datos local
 * se ejecutan EXCLUSIVAMENTE desde aquí
 */
import actions from './actions'

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
  actions
}
