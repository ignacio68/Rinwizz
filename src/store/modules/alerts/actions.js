import { firebaseDb } from '../../../firebase'

import { CREATE_ALERT, LOAD_ALERTS } from '@store/types/actions_types'

export default {
  /**
   * Crea una alerta
   *
   * @param {Object} alertData - Datos de la alerta
   */
  [CREATE_ALERT]: ({ commit }, alertData) => {
    console.log('Estoy en createAlert')
    commit('shared/CLEAR_ERROR', null, { root: true })
    const alert = {
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
        key = data.key
        return key
      })
      // Actualizamos con la fecha de inicio de la alerta
      // TODO: Hacerlo al crear la alerta
      .then(key => {
        const startDate = Date.now()
        return firebaseDb
          .ref('alerts')
          .child(key)
          .update({ startDate: startDate })
      })
      // Añadimos el resto de la alerta a la base de datos local
      .then(() => {
        commit('CREATE_ALERT', {
          ...alert,
          id: key,
          startDate: startDate
        })
        console.log(alert)
        console.log(key)
      })
      .catch(error => {
        commit('shared/SET_ERROR', error)
        console.log(error)
      })
  },

  /**
   * Recuperamos las alertas de la base de datos
   * Este punto hay que revisarlo a fondo
   * cuando se desarrolle el proyecto
   *
   */
  [LOAD_ALERTS]: ({ commit }) => {
    commit('shared/CLEAR_ERROR', null, { root: true })
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
        commit('SET_LOADED_ALERTS', alerts)
      })
      .catch(error => {
        commit('shared/SET_ERROR', error, { root: true })
        console.log(error)
      })
    /**
     * Cuenta las alertas disponibles
     */
  }
}
