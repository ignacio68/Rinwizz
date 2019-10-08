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
// import { DbConfig } from '@services/database'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { createDb, replyDb } from '@services/database'
import { cloudantConfig, authAlerts } from '@setup/cloudant'
import { configSample, optionsSample } from '@utils/database'
import Settings from './Settings'
import HomePage from './HomePage'

export default {
  name: 'AppSplitter',
  components: {
    Settings,
    HomePage
  },
  data() {
    return {
      isOpen: false
    }
  },
  async created() {
    console.log('AppSplitter.created()')
    // Load the users database
    await this.AUTO_SIGN_IN()
  },
  beforeMount() {
    console.log('AppSplitter.beforeMount()')
  },
  mounted() {
    console.log('AppSplitter.mounted()')
  },
  computed: {},
  methods: {
    ...mapActions('user', ['AUTO_SIGN_IN'])
  }
}
</script>

<style></style>
