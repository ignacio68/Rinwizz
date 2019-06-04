import { GET_CURRENT_POSITION } from '@store/types/actions_types'

export default {
  // options: (state, { ...defaults, ...options }),
  success(
    commit,
    {
      coords: {
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed
      },
      timestamp
    }
  ) {
    commit('LOCATION_CHANGED', {
      lat: latitude,
      lng: longitude,
      acc: accuracy,
      alt: altitude,
      altAcc: altitudeAccuracy,
      head: heading,
      spd: speed,
      ts: timestamp
    })
    commit('errors/LOCATION_ERROR', error.code, { root: true })
  },
  error(commit, error) {
    commit('errors/LOCATION_ERROR', error.code, { root: true })
  },
  [GET_CURRENT_POSITION]: state => {
    navigator.geolocation.getCurrentPosition(success, error, state.defaults)
  }
}
