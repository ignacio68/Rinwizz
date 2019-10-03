<template>
  <v-ons-splitter>
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
import { mapGetters, mapMutations } from 'vuex'
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
  beforeMount() {
    // Load the users database
    console.log('AppSplitter.beforeMount()')
  },
  created() {
    console.log('AppSplitter.created()')
  },
  computed: {},
  methods: {}
}
</script>

<style></style>
