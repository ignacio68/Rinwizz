import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './modules/alerts'
import auth from './modules/auth'
import localDataBase from './modules/localDataBase'
import navigator from './modules/navigator'
import shared from './modules/shared'
import social from './modules/social'
import user from './modules/user'
import userDb from './modules/userDb'
// import { errors } from './modules/errors'

import authErrors from './modules/errors/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alerts,
    auth,
    localDataBase,
    navigator,
    shared,
    social,
    user,
    userDb,
    authErrors
  }
})
