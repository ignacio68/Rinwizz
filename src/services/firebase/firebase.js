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
  console.log('initializeApp error: ' + error)
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
  const {result} = await firebaseAuth().createUserWithEmailAndPassword(
    userData.email,
    userData.password
  )
  // Actualizamos el perfil de firebase con el displayName
  await this.setUserProfile({ displayName: userData.name })
  const { user } = result
  return user
}

/**
 * Update the user profile
 *
 * @param {object} userData
 */
export const setUserProfile = userData => {
  new Promise((resolve, reject) => {
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
      currentUser.updateProfile(userData)
        .then(() => resolve())
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
export const applyActionCode = code => {
  new Promise((resolve, reject) => {
    firebaseAuth
      .applyActionCode(code)
      .then(() => resolve())
      .catch(error =>reject(error))
  })
}

/**
 * Login the user
 *
 * @param {object} userData
 */
export async function logIn(userData) {
  const  result  = await firebaseAuth().signInWithEmailAndPassword(
    userData.email,
    userData.password
  )
  const { user } = result
  return user
}

/**
 * Logout the user
 *
 */
export const logOut = () => {
  new Promise((resolve, reject) => {
    firebaseAuth().signOut()
      .then((result) => resolve()
    )
    .catch(error => reject (error))
  })
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
 * TODO: añadir fetchUser para conseguir la credencial
 * the user is deleted
 *
 * @param {string} credential
 */
export async function deleteUser(providerId) {
  const currentUser = firebaseAuth().currentUser
  await this.fetchCredential(providerId)
    .then(async credential => {
      await currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
    })
    .then(async () => {
      await currentUser.delete()
    })
}

/**
 * TODO: refactoring password use argument
 * Get the user credential
 *
 * @param {string} providerId
 */
export async function fetchCredential(password) {
  const currentUser = firebaseAuth().currentUser
  const providerId = currentUser.providerId
  await this.getTokenId()
    .then(idToken => {
      // eslint-disable-next-line no-unused-vars
      let credential
        switch (providerId) {
          case 'facebook.com': {
           credential = firebaseAuth.FacebookAuthProvider.credential(
              idToken
            )
            break
          }
          case 'google.com': {
            credential = firebaseAuth.GoogleAuthProvider.credential(
              idToken
            )
            break
          }
          case 'twitter.com': {
            credential = firebaseAuth.TwitterAuthProvider.credential(
              idToken
            )
            break
          }
          case 'password': {
            const email = currentUser.email
            const userPassword = password
            credential = firebaseAuth.EmailAuthProvider.credential(
              email ,
              userPassword
            )
            break
          }
          default:
            return('auth/user-empty')
        }
      }
  )
}

/**
 * Get the user TokenId
 */
export async function getTokenId() {
  const currentUser = firebaseAuth().currentUser
  const idToken = await currentUser.getIdToken().then(() => Promise.resolve(idToken))
}

/**
 * TODO: pasar a firestore y repasar
 * Update firebase users name database
 *
 * @param {string} userName
 */
export async function updateUserName(userName) {
  await firebaseDb
    .ref('usersNames/')
    .update(userName)
    .then(() => console.log('Actualizada la base de datos de nombres'))
}

/**
 * reauthenticate the user
 */
export async function reauthenticateUser() {
  const currentUser = firebaseAuth().currentUser
  await this.fetchCredential()
    .then(credential => {
      currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
  })
}
