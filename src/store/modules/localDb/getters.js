import { USERS_LOCAL_DB, GET_USER_FOLLOWINGS } from '@store/types/getters_types'

export default {
  [USERS_LOCAL_DB]: state => {
    return state.usersLocalDb
  },
  // TODO: repasar todo
  [GET_USER_FOLLOWINGS]: state => {
    return state.usersLocalDb.followings
  }
}
