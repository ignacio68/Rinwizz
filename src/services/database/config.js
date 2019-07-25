'use strict'

import { cloudantConfig, authUser } from '@setup/cloudant'

export default class DbConfig {
  constructor(nameDb) {
    this.nameDb = nameDb
  }
  getConfig() {
    const config = {}
    config.nameDb = this.nameDb
    config.apiKey = authUser.key
    config.apiPassword = authUser.password
    config.remote = cloudantConfig.url + '/' + this.nameDb
    return config
  }
}
