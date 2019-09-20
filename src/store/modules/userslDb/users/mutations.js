import {
  SET_LOCAL_DB,
  SET_FOLLOWINGS,
  SET_FOLLOWERS
} from './node_modules/@store/types/mutations_types'

export default {
  // Creamos la base de datos de usuarios
  [SET_LOCAL_DB]: (state, localDb) => {
    console.log(
      'estoy en SET_LOCAL_DB y la base de datos es: ' + JSON.stringify(localDb)
    )
    state.sersLocalDb = localDb
  },

  [SET_FOLLOWINGS]: (state, userFollowings) => {
    // Creamos la base de datos de followings
    console.log('estoy en SET_FOLLOWINGS')
    state.usersLocalDb.followings = userFollowings
  },

  [SET_FOLLOWERS]: (state, userFollowers) => {
    // Creamos la base de datos de followings
    console.log('estoy en SET_FOLLOWINGS')
    state.usersLocalDb.followers = userFollowers
  }
}
