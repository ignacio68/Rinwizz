// TODO: eliminar

export class DbConfig {
  constructor(config, url, credentials) {
    this.nameDb = config.nameDb
    this._id = config._id
    this.apiKey = credentials.key
    this.apiPassword = credentials.password
    this.remote = url.url + '/' + this.nameDb
  }
}

export class DbReplicationOptions {
  constructor(config, options) {
    this.nameDb = config.nameDb
  }
}
