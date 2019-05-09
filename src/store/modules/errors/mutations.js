import { SET_ERROR_MESSAGE } from '../../types/mutations_types'
export default {
  /**
   * Actualiza errorMessage
   *
   * @param {void} state
   * @param {String} message
   */
  [SET_ERROR_MESSAGE]: (state, message) => {
    state.errorMessage = message
  }
}
