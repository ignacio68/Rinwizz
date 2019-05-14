import geoFindMe from '@api/location'
import { GET_LOCATION } from '@store/types/actions_types'

export default {
  async [GET_LOCATION]({ commit }) {
    console.log('Estoy en GET_LOCATION')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      const userLocation = geoFindMe()
      await ('SET_USER_LOCATION', userLocation)
    } catch (error) {
      console.log('GET_LOCATION error: ' + error)
      commit('shared/SET_ERROR', null, { root: true })
    }
  }
}
