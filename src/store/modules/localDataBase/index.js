import loki from 'lokijs'

const db = new loki('rinwizz.db')
const user = db.addCollection("user")

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  
  state: {},
  getters: {},
  mutations: {},
  actions: {
    createLocalUserDb (newUser) {
    	user.insert({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        location: ''
        })
    	console.log('estoy en createLocalUserDb')
    	let userName
    	userName = user.get(name)
    	console.log('el usuario es: ' + userName)
    },
    // REVISAR -- UTILIZAR USER/user
    updateUserEmail (userEmail) {
    	user.update({
          email: userEmail
    	})
    },
    // REVISAR -- UTILIZAR USER/user
    updateUser (updateUser) {
    	user.update({
    		name: updateUser.name,
    		location: updateUser.location
    	})
    },
    getUserData (data) {
    	let userData
    	userData = user.get(data)
    	return userData
    },
    removeUser () {
    	removeCollection('user')
    }
  }
}
