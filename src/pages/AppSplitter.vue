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
import { mapGetters, mapMutations } from 'vuex'
import { createDb, fetchDoc } from '@services/database'
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
    const usersDb = createDb('users')
    if (usersDb) {
      await fetchDoc(usersDb, this.user.uid)
        .then(localUserdb => {
          this.SET_USER(localUserdb)
        })
        .catch(error => {
          console.log('fetchDoc error: ' + error)
        })
    } else {
      console.log('No hay base de datos de usuarios')
    }
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
    ...mapMutations('user', ['SET_USER'])
  }
}
</script>

<style></style>
