import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './modules/alerts'
import localDataBase from './modules/localDataBase'
import navigator from './modules/navigator'
import shared from './modules/shared'
import social from './modules/social'
import user from './modules/user'
import errorsAuth from './modules/errors/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alerts,
    localDataBase,
    navigator,
    shared,
    social,
    user,
    errorsAuth
  }
})
