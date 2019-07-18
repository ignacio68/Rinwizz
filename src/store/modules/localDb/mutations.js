import { createDb } from '@services/database/index'

import { SET_LOCAL_DB } from '@store/types/mutations_types'

export default {
  [SET_LOCAL_DB]: (state, config) => {
    // Creamos la base de datos 'users'
    const usersLocalDb = createDb(config)
    state.usersLocalDb = usersLocalDb
  }
}
