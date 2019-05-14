import { SET_USER_LOCATION } from '@store/types/mutations_types'

export default {
  [SET_USER_LOCATION]: (state, userLocation) => {
    console.log('SET_USER_LOCATION' + userLocation)
    state.userLocation = userLocation
  }
}
