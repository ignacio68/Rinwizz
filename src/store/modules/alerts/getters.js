import { LOADEDALERTS } from '../../types/getters_types'

export default {
  [LOADEDALERTS]: state => {
    console.log('Estoy en getters.loadedAlerts')
    console.log(state.loadedAlerts)
    return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
    /*
    return state.loadedMeetups.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    }) */
  }
}
