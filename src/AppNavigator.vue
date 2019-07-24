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
// import AppSplitter from '@pages/AppSplitter'
// import Welcome from '@pages/Shared/Welcome'
// import UserLocation from '@pages/Preferences/UserLocation'
import Avatar from '@pages/Preferences/Avatar'

export default {
  name: 'AppNavigator',

  beforeMount() {
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      this.PUSH(Avatar)
      // this.PUSH(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      this.PUSH(Avatar)
      // this.PUSH(AppSplitter)
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
