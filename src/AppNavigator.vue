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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      this.PUSH(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      // this.CREATE_ALL_USERS_LOCAL_DB()
      this.PUSH(AppSplitter)
      console.log('El usuario SI está autenticado')
    }
  },
  mounted() {
    console.log('AppNavigator mounted()')
  },
  computed: {
    // ...mapGetters('user', { user: 'USER' }),
    ...mapState('user', ['user']),
    ...mapGetters('navigator', { pageStack: 'PAGE_STACK', options: 'OPTIONS' }),

    userIsAuthenticated() {
      console.log('Comprobando si el usuario está autenticado')
      if (this.user) {
        console.log('hay user: ' + this.user.email)
      } else {
        console.log('No hay user')
      }
      return this.user !== null && this.user !== undefined
    }
  },
  methods: {
    ...mapMutations('navigator', ['PUSH', 'POP']),
    ...mapActions('usersLocalDb', ['CREATE_ALL_USERS_LOCAL_DB']),

    storePop() {
      this.POP()
    }
  }
}
</script>

<style></style>
