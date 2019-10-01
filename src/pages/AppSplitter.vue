<template>
  <v-ons-splitter>
    <v-ons-splitter-side
      collapse
      swipeable
      width="75%"
      side="left"
      :swipe-target-width="md && 25"
      :animation="md ? 'overlay' : 'reveal'"
      :open.sync="isOpen"
    >
      <settings></settings>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <home-page></home-page>
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>

<script>
// import { DbConfig } from '@services/database'
import { mapGetters, mapMutations } from 'vuex'
import { createDb, replyDb } from '@services/database'
import { cloudantConfig, authAlerts } from '@setup/cloudant'
import { configSample, optionsSample } from '@utils/database'
import Settings from './Settings'
import HomePage from './HomePage'
export default {
  name: 'AppSplitter',
  components: {
    Settings,
    HomePage
  },
  data() {
    return {
      isOpen: false
    }
  },
  created() {
    console.log('AppSplitter.created()')
  },
  async beforeMount() {
    // Load the users database
    console.log('AppSplitter.beforeMount()')
    try {
      // Establecemos la configuración
      const alertsConfig = await JSON.parse(JSON.stringify(configSample))
      // const timeStamp = Date.now()
      // config._id = timeStamp + "/" + user._id
      config.dbName = 'alerts'
      config.remote = cloudantConfig.url + '/' + config.dbName
      console.log('La configuración es: ' + JSON.stringify(config))

      // Establecemos las opciones
      const alertsOptions = await JSON.parse(JSON.stringify(optionsSample))
      options.auth.username = authAlerts.key
      options.auth.password = authAlerts.password
      // options.doc_ids.push(user._id)
      console.log('Las opciones son: ' + JSON.stringify(options))

      // Load the alerts database
      const alertsDb = await createDb('alerts')
      // Replicamos y sincronizamos la base de datos
      await replyDb(alertsDb, config, options)
    } catch (error) {
      console.log('AppSplitter_beforeMounted error: ' + error)
    }
  },
  computed: {
    ...mapGetters('user', { _id: 'USER_ID' })
  },
  methods: {
    ...mapMutations('localDb', ['SET_LOCAL_DB'])
  }
}
</script>

<style></style>
