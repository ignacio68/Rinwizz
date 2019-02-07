import Vue from "vue";
import Vuex from "vuex";

import alerts from "./modules/alerts";
import localDataBase from "./modules/localDataBase";
import navigator from "./modules/navigator";
import shared from "./modules/shared";
import signup from "./modules/signup";
import social from "./modules/social";
import user from "./modules/user";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alerts,
    localDataBase,
    navigator,
    shared,
    signup,
    social,
    user
  }
});
