import { USER, USER_ID } from '@store/types/getters_types'

export default {
  [USER]: (state, _, __, rootGetters) => state.user,
  [USER_ID]: state => state.user._id
}
