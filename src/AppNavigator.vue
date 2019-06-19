<template id="App">
  <v-ons-navigator :page-stack="pageStack" :pop-page="storePop" :options="options"></v-ons-navigator>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import HomePage from '@pages/HomePage'
import Welcome from '@pages/Shared/Welcome'
import UserLocation from '@pages/Preferences/UserLocation'
import UserLocationVue from './pages/Preferences/UserLocation.vue'
import Avatar from '@pages/Preferences/Avatar'

export default {
  name: 'appNavigator',

  beforeMount() {
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      this.REPLACE(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      this.REPLACE(HomePage)
      console.log('El usuario SI está autenticado')
    }
  },
  mounted() {
    console.log('Estoy en AppNavigator.mounted')
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('navigator', { pageStack: 'PAGE_STACK', options: 'OPTIONS' }),

    userIsAuthenticated() {
      console.log('Comprobando si el usuario está autenticado')
      return this.user !== null && this.user !== undefined
    }
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE', 'POP']),

    storePop() {
      this.POP()
    }
  }
}
</script>

<style></style>
