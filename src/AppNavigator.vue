<template id="App">
  <v-ons-navigator
    swipeable
    swipe-target-width="50px"
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppSplitter from '@views/AppSplitter'
import Welcome from '@views/Welcome'
// import UserLocation from '@views/Preferences/UserLocation'
// import Avatar from '@views/Preferences/Avatar'

export default {
  name: 'AppNavigator',

  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('navigator', { pageStack: 'PAGE_STACK', options: 'OPTIONS' }),

    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined
    }
  },
  created() {
    console.log('AppNavigator created()')
  },
  beforeMount() {
    if (!this.userIsAuthenticated) {
      this.PUSH(Welcome)
    } else {
      this.PUSH(AppSplitter)
      // this.PUSH(Avatar)
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
