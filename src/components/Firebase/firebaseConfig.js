export default {
  apiKey: 'AIzaSyC4OtkddDOolko9H3m9gJLCI9ihq4wvFqs',
  authDomain: 'alert-cliente.firebaseapp.com',
  databaseURL: 'https://alert-cliente.firebaseio.com',
  projectId: 'alert-cliente',
  storageBucket: 'alert-cliente.appspot.com',
  messagingSenderId: '256084022437'
}

/*
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyC4OtkddDOolko9H3m9gJLCI9ihq4wvFqs',
  authDomain: 'alert-cliente.firebaseapp.com',
  databaseURL: 'https://alert-cliente.firebaseio.com',
  projectId: 'alert-cliente',
  storageBucket: 'alert-cliente.appspot.com',
  messagingSenderId: '256084022437'
}

firebase.initializeApp(config)

// firebase utils
const auth = firebase.auth()
const currentUser = auth.currentUser
const db = firebase.database()

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const alertsCollection = db.collection('alerts')

export {
  auth,
  currentUser,
  db,
  alertsCollection
}
*/
