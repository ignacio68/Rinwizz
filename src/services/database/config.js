import { cloudantConfig, authUser } from '@setup/cloudant'

export default class DbConfig {
  constructor(nameDb) {
    this.nameDb = nameDb
    this.apiKey = authUser.key
    this.apiPassword = authUser.password
    this.remote = cloudantConfig.url + '/' + nameDb
  }
}
