/**
 * @file Rinwizz es una app multilenguaje para emitir alertas
 *
 * @copyright Ignacio López-Amor Pinillos 2019
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.4.0
 */

/*
 * Import Global Style (.css/.scss)
 * import './onsen-css-components.css'
 * Onsen UI CSS components source for custom themes (requires cssnext)
 */
import 'onsenui/css/onsenui-core.css'
import 'onsenui/css/onsen-css-components.css'

/**
 * Import Dependencies
 */
import Vue from 'vue'
import VueOnsen from 'vue-onsenui'

/**
 * Import Firebase
 */
import { firebaseAuth } from '@services/firebase'

/**
 *  Import Vuex
 */
import { store } from './store'

/**
 *  Import languages
 */
// import i18n from './locales'
import i18n from '@setup/i18n'

/**
 *  Import Geolocation plugin
 */
// import VuexGeolocation from 'vuex-geolocation'

/**
 * Import Timer
 * TODO: Revisar si importar directamente en el componente
 */
// import VueTimers from 'vue-timers'

/* Cuando se utiliza ESM */
/* TODO: ¡¡NO FUNCIONA!!
import VueOnsen from 'vue-onsenui/esm'
import 'onsenui/esm/elements/ons-page'
import 'onsenui/esm/elements/ons-navigator'
import 'onsenui/esm/elements/ons-tabbar'
import 'onsenui/esm/elements/ons-col'
import 'onsenui/esm/elements/ons-row'
import 'onsenui/esm/elements/ons-button'
import 'onsenui/esm/elements/ons-list'
import 'onsenui/esm/elements/ons-list-header'
import 'onsenui/esm/elements/ons-list-item'
import 'onsenui/esm/elements/ons-icon'
import 'onsenui/esm/elements/ons-input'
import 'onsenui/esm/elements/ons-alert-dialog'
import 'onsenui/esm/elements/ons-alert-dialog-button'
import 'onsenui/esm/elements/ons-card'
import 'onsenui/esm/elements/ons-select'
import 'onsenui/esm/elements/ons-toolbar'
import 'onsenui/esm/elements/ons-back-button'
import 'onsenui/esm/elements/ons-fab'
import 'onsenui/esm/elements/ons-progress-circular' // TODO: REVISAR SU UTILIZACION
*/

/**
 * Página de navegación
 */
import AppNavigator from './AppNavigator'

/**
 * TODO: Se utiliza para pruebas, en producción eliminar
 */
// import Fake from './Fake'

/**
 * Import Components
 */
// import ThePreloader from './components/Shared/ThePreloader' // NOTA: Revisar su uso (a eliminar)
import TheCustomtoolbar from '@components/Shared/TheCustomToolbar' // NOTA: Rediseñar

// import AlertCmp from './components/Shared/Alert'

/**
 * Global Config
 */
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// GESTION DE ERRORES
window.onerror = function(message, source, line, column, error) {
  console.log('Error: ' + message)
}

Vue.config.errorHandler = (err, vm, info) => {
  console.log('****errorHandler: ' + err.toString())
  console.log('Info: ' + info)
}

/**
 * Load Onsen
 */
Vue.use(VueOnsen)

/**
 * Load vuex-geolocation
 */
// const vuexGeolocation = VuexGeolocation.sync(store)
// Vue.use(vuexGeolocation)

/**
 * Load  Vue-Timer
 * TODO: cargar en el componente
 */
// Vue.use(VueTimers)

/**
 * Register components globally
 */
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
// Vue.component('the-preloader', ThePreloader) // Preloader
// Toolbar común
Vue.component('the-custom-toolbar', TheCustomtoolbar)
// Vue.component('app-alert', AlertCmp) // Alerta de errores

let app

firebaseAuth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      i18n,
      store,

      beforeCreate() {
        // Shortcut for Material Design, IOS & web
        Vue.prototype.md = this.$ons.platform.isAndroid()
        Vue.prototype.ios = this.$ons.platform.isIOS()
        // Vue.prototype.web =
        //   !this.$ons.platform.isAndroid() && !this.$ons.platform.isIOS()

        // Set iPhoneX flag based on URL
        if (window.location.search.match(/iphonex/i)) {
          document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
          document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
        }

        // Check if we can use the internationalization API
        if (window.Intl && typeof window.Intl === 'object') {
          // Set app language
          const val = navigator.language
          const lang = val.slice(0, 2)
          if (lang) {
            // const lang = val.replace('-', '')
            // const lang = val.slice(0, 2)
            i18n.locale = lang
            this.$store.commit('shared/SET_LANGUAGE', lang)
          } else {
            console.log('No se encuentra el idioma del navegador')
          }
        }
      },
      created() {
        console.log('Main created()')
        if (user) {
          this.$store.commit('user/SET_USER', user)
        } else {
          console.log('No existe el user')
        }
      },
      render: h => h(AppNavigator).$start()
      // render: h => h(Fake).$start()
      //       import routes from "./routes";
      // import BackendService from "./services/backend-service";

      // // Uncommment the following to see NativeScript-Vue output logs
      // // Vue.config.silent = false;

      // const backendService = new BackendService();
      // Vue.prototype.$backendService = backendService;
      //
      // TODO: examinar la posibilidad de implantarlo con un servicio de Firebase
      // new Vue({
      //   render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
      // }).$start();
    })
  }
})
/* eslint-disable no-new */
