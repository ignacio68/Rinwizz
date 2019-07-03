export const sampleUser = {
  _id: '',
  type: 'user',
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
  alerts: {}
}

export const sampleAlert = {
  _id: '',
  type: 'alert',
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
