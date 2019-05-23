import Vue from 'vue'
import Vuex from 'vuex'

import alerts from '@modules/alerts'
import auth from '@modules/auth'
import errors from '@modules/errors'
import localDb from '@modules/localDb'
import navigator from '@modules/navigator'
import password from '@modules/password'
import shared from '@modules/shared'
import social from '@modules/social'
import user from '@modules/user'
import userDb from '@modules/userDb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alerts,
    auth,
    errors,
    localDb,
    navigator,
    password,
    shared,
    social,
    user,
    userDb
  }
})
