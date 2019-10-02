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
import { mapState, mapMutations } from 'vuex'
import { updateDoc } from '@services/database'
import AppSplitter from '@pages/AppSplitter'

export default {
  name: 'greetings',
  namespace: true,
  data() {
    return {}
  },
  computed: {
    // TODO: revisa la utilización de mapGetters mejor que mapState
    ...mapState('user', { user: state => state.user }),
    ...mapState('usersLocalDb', { db: state => state.usersLocalDb })
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    async toHomePage() {
      await updateDoc(this.db, this.user._id, this.user)
      await this.REPLACE(AppSplitter)
    }
  }
}
</script>

<style scoped></style>
