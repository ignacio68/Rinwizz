import { createDb, DbConfig } from '@services/database'
import { cloudantConfig, authUsers } from '@setup/cloudant'

import { SET_LOCAL_DB } from '@store/types/mutations_types'

export default {
  [SET_LOCAL_DB]: (state, docId) => {
    // Creamos la base de datos 'users'
    console.log('estoy en SET_LOCAL_DB')

    const usersLocalDbConfig = {}
    usersLocalDbConfig.nameDb = 'users'
    usersLocalDbConfig._id = docId

    // Establecemos la configuración de la base de datos de usuarios
    const config = new DbConfig(usersLocalDbConfig, cloudantConfig, authUsers)

    // Creamos la base de datos de usuarios
    const usersLocalDb = createDb(config)
    if (usersLocalDb) {
      state.usersLocalDb = usersLocalDb
    } else {
      console.log('Ha habido un error en SET_LOCAL_DB')
    }
  }
}
