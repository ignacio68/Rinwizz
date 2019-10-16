<template id="App">
  <v-ons-navigator
    swipeable
    swipe-target-width="50px"
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

// import HomePage from '@pages/HomePage'
import AppSplitter from '@pages/AppSplitter'
import Welcome from '@pages/Shared/Welcome'
// import UserLocation from '@pages/Preferences/UserLocation'
// import Avatar from '@pages/Preferences/Avatar'

export default {
  name: 'AppNavigator',

  data() {
    return {}
  },
  created() {
    console.log('AppNavigator created()')
  },
  beforeMount() {
    if (!this.userIsAuthenticated) {
      this.PUSH(Welcome)
    } else {
      this.PUSH(AppSplitter)
    }
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('navigator', { pageStack: 'PAGE_STACK', options: 'OPTIONS' }),

    userIsAuthenticated() {
      console.log('Comprobando si el usuario está autenticado')
      if (this.user) {
      } else {
        // SOLO EN PRODUCCIÓN
        console.log('EL USUARIO NO ESTÁ AUTENTICADO')
      }
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
