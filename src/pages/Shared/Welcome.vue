<template>
  <v-ons-page class="main">
    <div class="container">
      <v-ons-col class="col">
        <h1 class="header">{{ $t('lang.pages.welcome.header') }}</h1>
        <p class="secondary-text">{{ $t('lang.pages.welcome.text') }}</p>
        <v-ons-list
          class="list"
          modifier
        >
          <v-ons-list-item
            class="list__item"
            modifier="nodivider"
          >{{ $t('lang.pages.welcome.text1') }}</v-ons-list-item>
          <v-ons-list-item
            class="list__item"
            modifier="nodivider"
          >{{ $t('lang.pages.welcome.text2') }}</v-ons-list-item>
          <v-ons-list-item
            class="list__item"
            modifier="nodivider"
          >{{ $t('lang.pages.welcome.text3') }}</v-ons-list-item>
          <v-ons-list-item
            class="list__item"
            modifier="nodivider"
          >{{ $t('lang.pages.welcome.text4') }}</v-ons-list-item>
        </v-ons-list>
        <v-ons-row class="buttons">
          <v-ons-button
            class="button__signup"
            modifier
            ripple="true"
            @click.prevent="toSignUp"
          >{{ $t('lang.pages.welcome.signup') }}</v-ons-button>
        </v-ons-row>
      </v-ons-col>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

import SignUp from '@pages/User/SignUp'

export default {
  name: 'welcome',
  mounted() {
    console.log('estoy en Welcome.mounted')
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    toSignUp() {
      this.PUSH(SignUp)
    }
  }
}
</script>

<style scoped>
.container {
}
.col {
  padding-left: 20px;
  padding-right: 20px;
}
.header {
  margin-top: 100px;
  text-align: center;
}
.secondary-text {
  margin-top: 25px;
}
.list {
  background-color: #eee;
}
.list__item {
  height: 40px;
  padding-left: 50px;
  font-size: 0.9em;
}
.button__signup {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background-color: red;
}
</style>
