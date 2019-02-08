import loki from 'lokijs'

const db = new loki('rinwizz.db', {
  autoload: true,
  autosave: true,
  autosaveInterval: 10000
})
const userData = db.addCollection('userData')
export {
  db,
  userData
}
