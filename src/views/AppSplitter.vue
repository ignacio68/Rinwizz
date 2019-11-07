<template>
  <v-ons-splitter id="appSplitter">
    <v-ons-splitter-side
      swipeable
      collapse
      width="75%"
      side="left"
      options.animation="overlay"
      :swipe-target-width="md && 25"
      :animation="md ? 'overlay' : 'reveal'"
      :open.sync="isOpen"
    >
      <Settings />
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <HomePage />
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Settings from './Main//Settings'
import HomePage from './Main/HomePage'
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
  computed: {
    ...mapGetters('user', { isLogged: 'USER_IS_LOGGED' })
  },
  async created() {
    if (!isLogged) {
      await this.LOAD_USER()
    }
  },
  methods: {
    ...mapActions('user', ['LOAD_USER'])
  }
}
</script>

<style scoped></style>
