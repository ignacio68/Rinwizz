// import PouchDB from 'pouchdb'

// export const db = new PouchDB('alerts')

export const listAlerts = {
  "_id": '',
  "type": 'list',
  "version": 1,
  "alerts": {}
  
}

export const sampleAlert = {
  "_id": '',
  "type": 'item',
  "version": 1,
  "title": '',
  "text": '',
  "avatar": '',
  "altAvatar": '',
  "startDate": '',
  "endDate": '',
  "phone": '',
  "link": '',
  "address": {
    "street": "",
    "coords": {
      "lat": "",
      "lng": ""
    }
  }
}
