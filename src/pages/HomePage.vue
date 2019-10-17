<template>
  <v-ons-page id="homePage">
    <v-ons-tabbar
      position="bottom"
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import Alerts from './Main/Alerts'
import Profile from './Main/Profile'
import Search from './Main/Search'

document.addEventListener(
  'init',
  event => {
    if (event.target.matches('#homePage')) {
      console.log('homePage is initiated.')
    }
  },
  false
)

document.addEventListener(
  'show',
  event => {
    if (event.target.matches('#homePage')) {
      console.log('homePage is show.')
    }
  },
  false
)

export default {
  name: 'homePage',
  data() {
    return {
      // tabs: [
      //   {
      //     label: this.$tc('lang.pages.homePage.tabbar', 0),
      //     icon: 'ion-ios-bell, material:md-notifications',
      //     page: Alerts,
      //     badge: 6
      //   },
      //   {
      //     label: this.$tc('lang.pages.homePage.tabbar', 1),
      //     icon: 'ion-camera, material:md-camera',
      //     page: Profile
      //   },
      //   {
      //     label: this.$tc('lang.pages.homePage.tabbar', 2),
      //     icon: 'ion-search, material:md-search',
      //     page: Search
      //   }
      // ],
      tabs: [
        {
          label: this.$tc('lang.pages.homePage.tabbar', 0),
          icon: 'ion-ios-bell, material:md-notifications',
          page: Alerts,
          badge: 6
        }
      ],
      numAlerts: '8'
    }
  },
  async created() {
    console.log('homePage.created()')
    // Load the alerts
    await this.LOAD_ALERTS
  },
  computed: {
    index: {
      get() {
        return this.$store.getters['navigator/INDEX']
      },
      set(newValue) {
        this.SET(newValue)
      }
    }
  },
  methods: {
    ...mapMutations('navigator', ['SET']),
    ...mapActions('alerts', ['LOAD_ALERTS'])
  }
}
</script>

<style scoped>
/* Custom 'white-content' modifier */
/*
.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}
.page--material .tabbar--white-content__button {
  color: rgba(255, 255, 255, 0.7);
}
.page--material .tabbar--white-content__border {
  background-color: white;
} */
</style>
