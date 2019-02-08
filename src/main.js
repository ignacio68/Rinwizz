/**
 * Import Global Style (.css/.scss)
 * import './onsen-css-components.css'
 * Onsen UI CSS components source for custom themes (requires cssnext)
 */
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// Import Dependency
import Vue from 'vue'
import VueOnsen from 'vue-onsenui'

// import Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './components/Firebase/firebaseConfig'
// const fb = require('./components/Firebase/firebaseConfig')

// import LokiJS
// import loki from 'lokijs'
// import { db, userData } from './loki'

// import store from Vuex
import { store } from './store'

// import languages
// NOTA: ¡¡¡¡¡¡¡UPDATE!!!!!!!!
// import i18n from './i18n'
import i18n from './locales/index'

// import Timer
import VueTimers from 'vue-timers'

/* Cuando se utiliza ESM
import VueOnsen from 'vue-onsenui/esm'
import 'onsenui/esm/elements/ons-page'
import 'onsenui/esm/elements/ons-navigator'
import 'onsenui/esm/elements/ons-tabbar'
import 'onsenui/esm/elements/ons-col'
import 'onsenui/esm/elements/ons-row'
import 'onsenui/esm/elements/ons-button'
import 'onsenui/esm/elements/ons-list'
import 'onsenui/esm/elements/ons-list-item'
import 'onsenui/esm/elements/ons-icon'
import 'onsenui/esm/elements/ons-input'
import 'onsenui/esm/elements/ons-alert-dialog'
import 'onsenui/esm/elements/ons-alert-dialog-button'
*/

import AppNavigator from "./AppNavigator"

/**
 * Import Components
 */
// import ThePreloader from './components/Shared/ThePreloader' // NOTA: Revisar su uso (a eliminar)
import TheCustomtoolbar from "./components/Shared/TheCustomToolbar" // NOTA: Rediseñar
// import AlertCmp from './components/Shared/Alert'

/**
 * Global Config
 */
Vue.config.productionTip = false

// Load Onsen
Vue.use(VueOnsen)

// Load  Vue-Timer
Vue.use(VueTimers)

/**
 * Register components globally
 */
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
// Vue.component('the-preloader', ThePreloader) // Preloader
Vue.component("the-custom-toolbar", TheCustomtoolbar) // Toolbar común
// Vue.component('app-alert', AlertCmp) // Alerta de errores

let app

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  console.log("Estoy en firebase.auth().onAuthStateChanged")
  if (!app) {
    app = new Vue({
      el: "#app",
      i18n,
      store,
      render: h => h(AppNavigator),
      beforeCreate() {
        console.log("main.js:beforeCreate()")
        /** this.$ons.ready(() => {
            }) */

        // Shortcut for Material Design, IOS & web
        Vue.prototype.md = this.$ons.platform.isAndroid()
        Vue.prototype.ios = this.$ons.platform.isIOS()
        Vue.prototype.web =
          !this.$ons.platform.isAndroid() && !this.$ons.platform.isIOS()

        // Set iPhoneX flag based on URL
        if (window.location.search.match(/iphonex/i)) {
          document.documentElement.setAttribute("onsflag-iphonex-portrait", '')
          document.documentElement.setAttribute("onsflag-iphonex-landscape", '')
        }

        // Check if we can use the internationalization API
        if (window.Intl && typeof window.Intl === "object") {
          // Assume it's supported, lets localize!
          console.log("Se  puede utilizar la internacionalizacion");
          // Set app language
          let val = navigator.language
          if (val) {
            // let lang = val.replace('-', '')
            let lang = val.slice(0, 2);
            i18n.locale = lang
            console.log("el lenguaje es " + i18n.locale)
          }
        }
      },
      created() {
        console.log("Estoy en main.js.created")
        if (user) {
          this.$store.dispatch("user/autoSignIn", user)
          /**
           * Recuperamos los datos del usuario
           */
          // this.$store.dispatch('user/fetchUserData')
          console.log("El usuario es: " + user.email)
          /**
           * Cargamos las alertas
           * 1ª Fase: cargamos todas las que hay en la base de datos
           * 2ª Fase: sólo las que están activas
           * 3ª Fase: las subscritas por el usuario
           */
          this.$store.dispatch("alerts/loadAlerts")
        } else {
          console.log("No existe user")
        }
      }
    })
  }
})
/* eslint-disable no-new */
