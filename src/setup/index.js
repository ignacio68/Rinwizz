import { config } from './firebase'
import { cloudantConfig, authUsers, authAlerts, authFakeAlerts } from './cloudant'
import map from './maps'
import i18n from './i18n'

export default {
  config,
  cloudantConfig, authUsers, authAlerts, authFakeAlerts,
  map,
  i18n
}
