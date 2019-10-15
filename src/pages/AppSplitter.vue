<template>
  <v-ons-splitter id="appSplitter">
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
import { mapActions } from 'vuex'
import Settings from './Settings'
import HomePage from './HomePage'
import asyncDataStatus from '@mixins/asyncDataStatus'

export default {
  name: 'AppSplitter',
  components: {
    Settings,
    HomePage
  },
  mixins: [asyncDataStatus],
  data() {
    return {
      isOpen: false
    }
  },
  async created() {
    console.log('AppSplitter.created()')
    // const myUser = this.$store.getters['user/user']
    // console.log('myUser es: ' + JSON.stringify(myUser))
    await this.AUTO_SIGN_IN()
  },
  beforeMount() {
    console.log('AppSplitter.beforeMount()')
  },
  mounted() {
    console.log('AppSplitter.mounted()')
  },
  methods: {
    ...mapActions('user', ['AUTO_SIGN_IN'])
  }
}
</script>

<style scoped></style>
