// import PouchDB from 'pouchdb'

// export const db = new PouchDB('alerts')
export const sampleUser = {
  _id: '',
  type: 'item',
  name: '',
  email: '',
  phone: '',
  alertPhone: '',
  link: '',
  creationDate: '',
  lastSigninDate: '',
  isAnonymous: true,
  isVerified: false,
  providerId: 2,
  personal: {
    age: '',
    gender: ''
  },
  preferences: {
    entertainments: [],
    foods: [],
    sports: []
  },
  location: {
    lat: '',
    lng: '',
    address: {}
  }
}

export const listAlerts = {
  _id: '',
  type: 'list',
  version: 1,
  alerts: {}
}

export const sampleAlert = {
  _id: '',
  type: 'item',
  version: 1,
  title: '',
  text: '',
  avatar: '',
  altAvatar: '',
  startDate: '',
  endDate: '',
  phone: '',
  link: '',
  location: {
    lat: '',
    lng: '',
    address: {}
  }
}
