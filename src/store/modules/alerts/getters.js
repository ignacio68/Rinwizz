import { GET_ALERTS, NUM_ALERTS } from '@store/types/getters_types'

export default {
  [GET_ALERTS]: state => {
    console.log('Estoy en getters.loadedAlerts')
    console.log(state.loadedAlerts)
    return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
    /*
    return state.loadedMeetups.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    }) */
  },
  [NUM_ALERTS]: state => state.numAlerts
}
