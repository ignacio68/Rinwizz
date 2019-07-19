import { createDb } from '@services/database/index'

import { SET_LOCAL_DB } from '@store/types/mutations_types'

export default {
  [SET_LOCAL_DB]: (state, config) => {
    // Creamos la base de datos 'users'
    console.log('estoy en SET_LOCAL_DB')
    const usersLocalDb = createDb(config)
    if (usersLocalDb) {
      state.usersLocalDb = usersLocalDb
    } else {
      console.log('Ha habido un error en SET_LOCAL_DB')
    }
  }
}
