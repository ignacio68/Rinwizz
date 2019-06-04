import { USER_LOCATION } from '@store/types/getters_types'

export default {
  [USER_LOCATION]: state => {
    return {
      lat: state.lat,
      lng: state.lng
    }
  }
}
