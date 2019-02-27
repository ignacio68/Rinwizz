/**
 * Import Dependency
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * Import Locales
 */
import enUs from './i18n/en_US/index'
import esEs from './i18n/es_ES/index'

/**
 * Import number formats
 */
import { numberFormats } from './i18n/numberFormats'

/**
 * Import date formats
 */
import { dateTimeFormats } from './i18n/dateTimeFormats'

const messages = {
  en: {
    lang: enUs
  },
  es: {
    lang: esEs
  }
}

/**
 * Config
 */
Vue.use(VueI18n)

/**
 * Export
 */

export default new VueI18n({
  fallbackLocale: 'en',
  messages,
  dateTimeFormats,
  numberFormats
})
