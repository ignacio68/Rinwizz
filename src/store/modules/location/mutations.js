import { SET_USER_LOCATION } from '@store/types/mutations_types'

export default {
  [SET_USER_LOCATION]: (state, userLocation) => {
    state.location = userLocation
  }
}
