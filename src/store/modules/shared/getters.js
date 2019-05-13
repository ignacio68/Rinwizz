import { LOADING, ERROR, ACTION_PASS } from '@store/types/getters_types'

export default {
  [LOADING]: state => state.loading,
  [ERROR]: state => state.error,
  [ACTION_PASS]: state => state.actionPass
}
