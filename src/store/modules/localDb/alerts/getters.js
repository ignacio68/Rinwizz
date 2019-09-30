import { ALERTS_LOCAL_DB } from '@store/types/getters_types'

export default {
  [ALERTS_LOCAL_DB]: state => {
    return state.alertsLocalDb
  }
}
