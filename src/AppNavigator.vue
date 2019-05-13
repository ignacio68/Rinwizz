<template id="App">
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import HomePage from '@pages/HomePage'
import Welcome from '@pages/Shared/Welcome'

export default {
  name: 'appNavigator',
  beforeMount() {
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      this.PUSH(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      this.PUSH(HomePage)
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
    /*
    ...mapState('user', {
      user: state => state.user
    }),*/
    /*
    ...mapState('navigator', {
      pageStack: state => state.stack,
      options: state => state.options
    }),*/
    ...mapGetters('user', ['USER']),
    ...mapGetters('navigator', { pageStack: 'PAGE_STACK', options: 'OPTIONS' }),

    userIsAuthenticated() {
      console.log('Comprobando si el usuario está autenticado')
      return (
        // this.$store.getters['user/user'] !== null &&
        // this.$store.getters['user/user'] !== undefined
        this.user !== null && this.user !== undefined
      )
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
