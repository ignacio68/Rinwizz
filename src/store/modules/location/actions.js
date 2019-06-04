import * as locationService from '@utils/location'

import { GET_CURRENT_POSITION } from '@store/types/actions_types'

export default {
  // options: (state, { ...defaults, ...options }),
  async [GET_CURRENT_POSITION]({ commit, dispatch }) {
    console.log('Estoy en GET_CURRENT_POSITION')
    try {
      const coordinates = await locationService.currentCoordinates()
      console.log('Las coordenadas son: ' + coordinates)
      console.log('El  timestamp es: ' + coordinates.timestamp)
      commit('SET_USER_COORDS', coordinates)
    } catch (error) {
      dispatch('errors/LOCATION_ERROR', error.message, { root: true })
    }
  }
}
