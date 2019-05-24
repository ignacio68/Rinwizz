<template id="App">
  <v-ons-navigator :page-stack="pageStack" :pop-page="storePop" :options="options"></v-ons-navigator>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import HomePage from '@pages/HomePage'
import Welcome from '@pages/Shared/Welcome'
import Hobbies from '@pages/Preferences/Hobbies'

export default {
  name: 'appNavigator',
  beforeMount() {
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      this.PUSH(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      this.PUSH(Hobbies)
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
    ...mapMutations('navigator', ['PUSH', 'POP']),

    storePop() {
      this.POP()
    }
  }
}
</script>

<style></style>
