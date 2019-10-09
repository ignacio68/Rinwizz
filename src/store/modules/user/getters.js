import { USER } from '@store/types/getters_types'

export default {
  [USER]: (state, _, __, rootGetters) => state.user
}
