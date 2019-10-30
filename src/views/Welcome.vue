<template>
  <v-ons-page class="main">
    <div class="content">
      <v-ons-col class="col">
        <h1 class="header">{{ $t('lang.views.welcome.header') }}</h1>
        <p class="secondary-text">{{ $t('lang.views.welcome.text') }}</p>
        <v-ons-list class="list" modifier>
          <v-ons-list-item class="list__item" modifier="nodivider">{{
            $t('lang.views.welcome.text1')
          }}</v-ons-list-item>
          <v-ons-list-item class="list__item" modifier="nodivider">{{
            $t('lang.views.welcome.text2')
          }}</v-ons-list-item>
          <v-ons-list-item class="list__item" modifier="nodivider">{{
            $t('lang.views.welcome.text3')
          }}</v-ons-list-item>
          <v-ons-list-item class="list__item" modifier="nodivider">{{
            $t('lang.views.welcome.text4')
          }}</v-ons-list-item>
        </v-ons-list>
        <v-ons-row class="buttons">
          <v-ons-button
            class="button__signup"
            modifier
            ripple="true"
            @click.prevent="toSignUp"
            >{{ $t('lang.views.welcome.signup') }}</v-ons-button
          >
        </v-ons-row>
      </v-ons-col>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

import SignUp from '@views/Auth/SignUp'

export default {
  name: 'Welcome',
  methods: {
    ...mapMutations('navigator', ['REPLACE']),
    toSignUp() {
      this.REPLACE(SignUp)
    }
  }
}
</script>

<style scoped>
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
