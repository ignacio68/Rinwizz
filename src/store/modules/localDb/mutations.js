import { SET_LOCAL_DB, SET_FOLLOWINGS } from '@store/types/mutations_types'

export default {
  [SET_LOCAL_DB]: (state, localDb) => {
    // Creamos la base de datos 'users'
    console.log('estoy en SET_LOCAL_DB')
  },
  // TODO: repasar todo
  [SET_FOLLOWINGS]: state => {
    // Creamos la base de datos de followings
    console.log('estoy en SET_FOLLOWINGS')
    const userFollowings = state.usersLocalDb.followings
  }
}
