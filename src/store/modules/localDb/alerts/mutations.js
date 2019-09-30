// TODO: revisar si es de utilidad

import {
  SET_ALERTS_LOCAL_DB,
  SET_USER_ALERTS_LOCAL_DB
} from '@store/types/mutations_types'

export default {
  // Creamos en caché la base de datos de alertas
  [SET_ALERTS_LOCAL_DB]: (state, localDb) => {
    console.log(
      'estoy en SET_USERS_LOCAL_DB y la base de datos es: ' +
        JSON.stringify(localDb)
    )
    state.alertsLocalDb = localDb
  },

  // Creamos en caché la base de datos de las alertas del usuario
  [SET_USER_ALERTS_LOCAL_DB]: (state, localDb) => {
    console.log(
      'estoy en SET_USERS_LOCAL_DB y la base de datos es: ' +
        JSON.stringify(localDb)
    )
    state.userAlertsLocalDb = localDb
  }
}
