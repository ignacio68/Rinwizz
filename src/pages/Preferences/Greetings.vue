<template>
  <v-ons-page id="greetings">
    <div class="content">
      <h1 style="text-align:center">{{ $t('lang.pages.greetings.greetings') }}</h1>
      <br />
      <h3>{{ $t('lang.pages.greetings.main') }}</h3>
      <br />
      <div class="homePageButton">
        <v-ons-button
          class="homePageButton__button"
          name="homePageButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toHomePage"
        >{{ $t('lang.pages.greetings.button') }}</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import AppSplitter from '@pages/AppSplitter'

export default {
  name: 'greetings',
  namespace: true,
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toHomePage() {
      this.REPLACE(AppSplitter)
    }
  }
}
</script>

<style scoped>
</style>
