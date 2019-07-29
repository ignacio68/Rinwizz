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
import { DbConfig } from '@services/database/config'
import { mapGetters, mapMutations } from 'vuex'
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
  beforeMount() {
    // Load the users database
    console.log('AppSplitter.beforeMount()')
    const usersDbConfig = new DbConfig('users')
    usersDbConfig._id = this._id
    console.log('La configuración es: ' + JSON.stringify(usersDbConfig))
    this.SET_LOCAL_DB(usersDbConfig)

    // Load the alerts database
    // const alertsDbConfig = new DbConfig('alerts')
    // console.log('La configuración es: ' + JSON.stringify(alertsDbConfig))
    // this.SET_LOCAL_DB(alertsDbConfig)
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
