<template id="App">
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import HomePage from '@pages/HomePage'
import Welcome from '@pages/Shared/Welcome'

export default {
  name: 'appNavigator',
  beforeMount() {
    console.log('AppNavigator beforeMount()')
    if (!this.userIsAuthenticated) {
      // this.$store.commit('navigator/PUSH', Welcome)
      this.PUSH(Welcome)
      console.log('El usuario NO está autenticado')
    } else {
      // this.$store.commit('navigator/PUSH', HomePage)
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
    // ...mapGetters('navigator', ['PAGE_STACK, OPTIONS']),

    pageStack() {
      return this.$store.getters['navigator/PAGE_STACK']
      // return this.PAGE_STACK
    },

    options() {
      return this.$store.getters['navigator/OPTIONS']
      // return this.options
    },

    userIsAuthenticated() {
      console.log('Comprobando si el usuario está autenticado')
      return (
        this.$store.getters['user/user'] !== null &&
        this.$store.getters['user/user'] !== undefined
      )
    }
  },
  methods: {
    ...mapGetters('navigator', ['PAGE_STACK, OPTIONS']),
    ...mapMutations('navigator', ['PUSH', 'POP']),
    storePop() {
      this.$store.commit('navigator/POP')
      // this.POP()
    }
  }
}
</script>

<style></style>
