export const usersListSample = {
  _id: 'users',
  type: 'list',
  alerts: {}
}
export const userSample = {
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

export const alertsListSample = {
  _id: 'alerts',
  type: 'list',
  alerts: {}
}

export const alertSample = {
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
