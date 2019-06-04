import { LOCATION_CHANGED } from '@store/types/mutations_types'

/**
 * Actualiza la información de la localización del usuario en el state
 */
export default {
  [LOCATION_CHANGED]: (
    state,
    { lat, lng, acc, alt, altAcc, head, spd, ts }
  ) => {
    state.lat = lat
    state.lng = lng
    state.acc = acc
    state.alt = alt
    state.altAcc = altAcc
    state.head = head
    state.spd = spd
    state.ts = ts
  }
}
