import { LOADED_ALERTS } from '../../types/getters_types'

export default {
  [LOADED_ALERTS]: state => {
    console.log('Estoy en getters.loadedAlerts')
    console.log(state.loadedAlerts)
    return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
    /*
    return state.loadedMeetups.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    }) */
  }
}
