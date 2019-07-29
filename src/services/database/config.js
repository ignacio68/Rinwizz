'use strict'

import { cloudantConfig, authUser } from '@setup/cloudant'

export class DbConfig {
  constructor(nameDb) {
    this.nameDb = nameDb
    this.apikey = authUser.key
    this.apiPassword = authUser.password
    this.remote = cloudantConfig.url + '/' + this.nameDb
  }
}
