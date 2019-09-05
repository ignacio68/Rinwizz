export class DbConfig {
  // constructor(nameDb, path, auth) {
  //   this.nameDb = nameDb
  //   this.apiKey = auth.key
  //   this.apiPassword = auth.password
  //   this.remote = path.url + '/' + this.nameDb
  // }
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
