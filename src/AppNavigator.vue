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

// import HomePage from '@views/HomePage'
import AppSplitter from '@views/AppSplitter'
import Welcome from '@views/Shared/Welcome'
// import UserLocation from '@views/Preferences/UserLocation'
// import Avatar from '@views/Preferences/Avatar'

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
