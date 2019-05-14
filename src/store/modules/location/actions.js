// import userGeolocation from '@utils/location'
import { GET_USER_LOCATION } from '@store/types/actions_types'

// TODO: arreglarlo todo
export default {
  userGeolocation() {
    if (navigator.geolocation) {
      console.log('La Geolocalizacion está soportada')
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation no está supportada por tu browser')
    }
    function success(getPosition) {
      const latitude = getPosition.coords.latitude
      const longitude = getPosition.coords.longitude
      console.log(
        'la latitud es: ' + latitude + ' y la longitud es: ' + longitude
      )
    }
    function error() {
      console.log('Unable to retrieve your location')
    }
  },

  async [GET_USER_LOCATION]({ commit }) {
    console.log('Estoy en GET_USER_LOCATION')
    commit('shared/CLEAR_ERROR', null, { root: true })
    try {
      this.userGeolocation()

      const userLocation = [40.456100299999996, -3.6805635000000003]
      console.log('userGeolocation es: ' + userLocation)
      await commit('SET_USER_LOCATION', userLocation)
    } catch (error) {
      console.log('GET_USER_LOCATION error: ' + error)
      commit('shared/SET_ERROR', null, { root: true })
    }
  }
}
