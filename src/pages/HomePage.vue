<template>
  <v-ons-page>
    <the-custom-toolbar
      modifier="white-content"
      :pageTitle="$t('lang.pages.homePage.toolbar.title')"
    >
      <!--v-ons-toolbar-button slot="right" modifier="white-content"
                            @click="$store.commit('splitter/toggle'); showTip(null, 'Try dragging from right edge!')"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button-->
    </the-custom-toolbar>

    <v-ons-tabbar
      position="bottom"
      swipeable
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

import Alerts from './Main/Alerts'
import Profile from './Main/Profile'
import Search from './Main/Search'

export default {
  name: 'homePage',
  data() {
    return {
      tabs: [
        {
          label: this.$tc('lang.pages.homePage.tabbar', 0),
          icon: 'ion-camera, material:md-camera',
          page: Profile
        },
        {
          label: this.$tc('lang.pages.homePage.tabbar', 1),
          icon: 'ion-ios-bell, material:md-notifications',
          page: Alerts,
          badge: 6
        },
        {
          label: this.$tc('lang.pages.homePage.tabbar', 2),
          icon: 'ion-search, material:md-search',
          page: Search
        }
      ],
      numAlerts: '8'
    }
  },
  computed: {
    index: {
      get() {
        return this.$store.getters['navigator/index']
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
}
</style>
