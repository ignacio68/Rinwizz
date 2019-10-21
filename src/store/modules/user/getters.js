import {
  USER,
  USER_ID,
  USER_IS_VERIFIED,
  USER_FOLLOWING
} from '@store/types/getters_types'

export default {
  [USER]: state => state.user,
  [USER_ID]: state => state.user._id,
  [USER_IS_VERIFIED]: state => state.user.isVerified,
  [USER_FOLLOWING]: state => state.user.following
}
