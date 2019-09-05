import { createDb, DbConfig } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'

import { SET_LOCAL_DB } from '@store/types/mutations_types'

export default {
  [SET_LOCAL_DB]: (state, config) => {
    // Creamos la base de datos 'users'
    console.log('estoy en SET_LOCAL_DB')
    let setup = new DbConfig(config, cloudantConfig, authUsers )
    const usersLocalDb = createDb(setup)
    if (usersLocalDb) {
      state.usersLocalDb = usersLocalDb
    } else {
      console.log('Ha habido un error en SET_LOCAL_DB')
    }
  }
}
