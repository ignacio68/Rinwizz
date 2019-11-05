<template>
  <v-ons-page id="homePage">
    <v-ons-tabbar position="bottom" :tabs="tabs" :index.sync="index" />
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

import Alerts from '@views/Alerts/Alerts'
// import Profile from '@views/User/Profile'
// import Search from '@views/Search/Search'

// document.addEventListener(
//   'init',
//   event => {
//     if (event.target.matches('#homePage')) {
//       console.log('homePage is initiated.')
//     }
//   },
//   false
// )

// document.addEventListener(
//   'show',
//   event => {
//     if (event.target.matches('#homePage')) {
//       console.log('homePage is show.')
//     }
//   },
//   false
// )

export default {
  name: 'HomePage',
  data() {
    return {
      // tabs: [
      //   {
      //     label: this.$tc('lang.views.homePage.tabbar', 0),
      //     icon: 'ion-ios-bell, material:md-notifications',
      //     page: Alerts,
      //     badge: 6
      //   },
      //   {
      //     label: this.$tc('lang.views.homePage.tabbar', 1),
      //     icon: 'ion-camera, material:md-camera',
      //     page: Profile
      //   },
      //   {
      //     label: this.$tc('lang.views.homePage.tabbar', 2),
      //     icon: 'ion-search, material:md-search',
      //     page: Search
      //   }
      // ],
      tabs: [
        {
          label: this.$tc('lang.views.homePage.tabbar', 0),
          icon: 'ion-ios-bell, material:md-notifications',
          page: Alerts,
          badge: 6
        }
      ],
      numAlerts: '8'
    }
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
    ...mapMutations('navigator', ['SET'])
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
