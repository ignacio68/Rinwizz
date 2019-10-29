<template>
  <v-ons-page id="greetings">
    <div class="content">
      <h1 style="text-align:center">
        {{ $t('lang.views.greetings.greetings') }}
      </h1>
      <br />
      <h3>{{ $t('lang.views.greetings.main') }}</h3>
      <br />
      <div class="homePageButton">
        <v-ons-button
          class="homePageButton__button"
          name="homePageButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toHomePage"
        >
          {{ $t('lang.views.greetings.button') }}
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { updateDoc } from '@services/database'
import AppSplitter from '@views/AppSplitter'

export default {
  name: 'Greetings',
  namespace: true,
  data() {
    return {}
  },
  computed: {
    // TODO: revisa la utilización de mapGetters mejor que mapState
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('usersLocalDb', { db: 'USERS_LOCAL_DB' })
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toHomePage() {
      updateDoc(this.db, this.user._id, this.user)
      this.REPLACE(AppSplitter)
    }
  }
}
</script>

<style scoped></style>
