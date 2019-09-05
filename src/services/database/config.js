export class DbConfig {
  constructor(nameDb, path, auth) {
    this.nameDb = nameDb
    this.apiKey = auth.key
    this.apiPassword = auth.password
    this.remote = path.url + '/' + this.nameDb
  }
}
