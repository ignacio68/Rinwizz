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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { fetchDoc } from '@services/database'
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
    await this.AUTO_SIGN_IN()
    // const usersDb = createDb('users')
    // if (usersDb) {
    //   await fetchDoc(usersDb, this.user._id)
    //     .then(localUserDb => {
    //       this.SET_USER(localUserDb)
    //     })
    //     .catch(error => {
    //       console.log('fetchDoc error: ' + error)
    //     })
    // } else {
    //   console.log('No hay base de datos de usuarios')
    // }
  },
  beforeMount() {
    console.log('AppSplitter.beforeMount()')
  },
  mounted() {
    console.log('AppSplitter.mounted()')
  },
  computed: {
    ...mapGetters('user', { user: 'USER' })
  },
  methods: {
    ...mapMutations('user', ['SET_USER']),
    ...mapActions('user', ['AUTO_SIGN_IN'])
  }
}
</script>

<style></style>
