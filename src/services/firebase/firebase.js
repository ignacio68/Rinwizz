/* eslint-disable prettier/prettier */
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import { config } from '@setup/firebase'

try {
  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
  }
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log('========Firebase initializer=============')
  console.log('El error de inicialización de Firebase es: ' + error)
  console.log('====================================')
}

// - Storage reference
export const storage = firebase.storage()
export const storageRef = firebase.storage().ref()

// Initialize Database through Firebase Database
export const firebaseDb = firebase.database()
/* Se utiliza con Firestore
  const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
export { db }
*/

// - Database authorize
export let firebaseAuth = firebase.auth
export const currentUser = firebaseAuth().currentUser
// export let functions = firebase.functions()
// export let firebaseRef = firebaseDb().ref()

// - Firebase default
export default firebase

// firebase collections
// const alertsCollection = db.collection('alerts')

/**
 * Signup the user
 *
 * @param {object} userData
 */
export async function signUp(userData) {
  const { user } = await firebaseAuth().createUserWithEmailAndPassword(
    userData.email,
    userData.password
  )
  return user
}

/**
 * Update the user profile
 *
 * @param {object} userData
 */
export const setUserProfile = userData => {
  return new Promise((resolve, reject) => {
    const userActive = firebaseAuth().currentUser
    if (userActive) {
      userActive.updateProfile(userData).then(() => {
        resolve()
      })
    } else {
      reject('auth/user-empty')
    }
  })
}

/**
 * Send a verification email to the user
 *
 * @param {string} actionCodeSettings
 */
export const sendEmailVerification = actionCodeSettings => {
  return new Promise((resolve, reject) => {
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
      currentUser
        .sendEmailVerification(actionCodeSettings)
        .then(() => {
          resolve()
          console.log('email enviado')
        })
        .catch(error => {
          reject(error.code)
        })
    } else {
      reject('auth/user-empty')
    }
  })
}

// TODO: revisar
export async function applyActionCode(code) {
  await firebaseAuth.applyActionCode(code)
}

/**
 * Login the user
 *
 * @param {object} userData
 */
export async function logIn(userData) {
  const { user } = await firebaseAuth().signInWithEmailAndPassword(
    userData.email,
    userData.password
  )
  return user
}

/**
 * Logout the user
 *
 */
export async function logOut() {
  const result = await firebaseAuth().signOut()
  return result
}

/**
 * User authorization changed event
 */
export const onAuthStateChange = () => {
    console.log('Estoy en onAuthStateChange')
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        console.log('user: ' + user)
        return user
      } else {
        console.log('No hay user')
      }
    })
}


/**
 * the user is deleted
 */
