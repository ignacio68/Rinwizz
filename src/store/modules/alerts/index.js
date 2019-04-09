/**
 * Metodos utilizados para el uso de las alertas
 */
import { firebaseDb } from '../../../firebase'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    loadedAlerts: []
  },
  getters: {
    loadedAlerts(state) {
      console.log('Estoy en getters:loadedAlerts')
      console.log(state.loadedAlerts)
      return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
      /*
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      }) */
    }
  },
  mutations: {
    /**
     * Carga las alertas en el objeto loadedAlerts del State
     *
     * @param {Object} alerts
     */
    setLoadedAlerts(state, alerts) {
      console.log('Estoy en setLoadedAlerts')
      state.loadedAlerts = alerts
      console.log(state.loadedAlerts)
    },
    /**
     * Añade una alerta nueva al objeto loadedAlerts en el State
     *
     * @param {Object} alert
     */
    createAlert(state, alert) {
      state.loadedAlerts.push(alert)
    }
  },
  actions: {
    /**
     * Crea una alerta
     *
     * @param {Object} alertData - Datos de la alerta
     */
    createAlert({ commit }, alertData) {
      console.log('Estoy en createAlert')
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      // console.log(this.$store.user.state.user)
      const alert = {
        // creatorId: this.$store.getters['user/user'],
        endDate: alertData.endDate,
        title: alertData.title,
        text: alertData.text,
        link: alertData.link,
        phone: alertData.alertPhone || '' // utilizar por defecto el guardado en Firebase
      }
      let key
      // Genera una nueva alerta en la base de datos
      firebaseDb
        .ref('alerts')
        .push(alert)
        .then(data => {
          commit('shared/setLoading', false, { root: true })
          key = data.key
          return key
        })
        // Actualizamos con la fecha de inicio de la alerta
        .then(key => {
          const startDate = Date.now()
          return firebase
            .database()
            .ref('alerts')
            .child(key)
            .update({ startDate: startDate })
        })
        // Añadimos el resto de la alerta a la base de datos
        .then(() => {
          commit('createAlert', {
            ...alert,
            id: key
          })
          console.log(alert)
          console.log(key)
        })
        .catch(error => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error)
          console.log(error)
        })
    },

    /**
     * Recuperamos las alertas de la base de datos
     * Este punto hay que revisarlo a fondo
     * cuando se desarrolle el proyecto
     *
     */
    loadAlerts({ commit }) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy en action:loadAlerts')
      firebaseDb
        .ref('alerts')
        .once('value')
        .then(data => {
          console.log('Ahora estoy dentro de la base de datos /alert')
          const alerts = [] // utilizar un objeto {}
          const obj = data.val()
          console.log(obj)
          for (let key in obj) {
            alerts.push({
              id: key,
              creatorId: obj[key].creatorId,
              userIcon: obj[key].userIcon,
              userName: obj[key].userName,
              startDate: obj[key].startDate,
              endDate: obj[key].endDate,
              alertTitle: obj[key].title,
              alertText: obj[key].text,
              alertLink: obj[key].link,
              alertPhone: obj[key].phone
            })
          }
          commit('setLoadedAlerts', alerts)
          commit('shared/setLoading', false, { root: true })
        })
        .catch(error => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    }
  }
}
