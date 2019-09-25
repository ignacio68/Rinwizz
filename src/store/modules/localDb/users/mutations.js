// TODO: revisar si es de utilidad

import {
  SET_USERS_LOCAL_DB,
  SET_USER_LOCAL_DB,
  SET_FOLLOWINGS,
  SET_FOLLOWERS
} from '@store/types/mutations_types'

export default {
  // Creamos la base de datos de usuarios
  [SET_USERS_LOCAL_DB]: (state, dbName) => {
    console.log(
      'estoy en SET_USERS_LOCAL_DB y la base de datos es: ' +
        JSON.stringify(dbName)
    )
    state.usersLocalDb = dbName
  },

  [SET_USER_LOCAL_DB]: (state, dbName) => {
    console.log(
      'estoy en SET_user_LOCAL_DB y la base de datos es: ' +
        JSON.stringify(dbName)
    )
    state.userLocalDb = dbName
  },

  [SET_FOLLOWINGS]: (state, userFollowings) => {
    // Creamos la base de datos de followings
    console.log('estoy en SET_FOLLOWINGS')
    state.userLocalDb.followings = userFollowings
  },

  [SET_FOLLOWERS]: (state, userFollowers) => {
    // Creamos la base de datos de followers
    console.log('estoy en SET_FOLLOWINGS')
    state.userLocalDb.followers = userFollowers
  }
}
