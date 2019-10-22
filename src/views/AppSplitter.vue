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
    await this.LOAD_USER()
  },
  methods: {
    ...mapActions('user', ['LOAD_USER'])
  }
}
</script>

<style scoped></style>
