<template>
  <v-ons-page id="personal">
    <div class="content">
      <h4>{{ $t('lang.views.personal.main') }}</h4>
      <br />
      <v-ons-row class="buttons">
        <v-ons-button
          class="skip__button"
          name="skipButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toGreetings"
        >
          {{ $t('lang.buttons.skip') }}
        </v-ons-button>
        <v-ons-button
          class="confirm__button"
          name="confirmrButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toGender"
        >
          {{ $t('lang.views.personal.button') }}
        </v-ons-button>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import Gender from './Gender'
import Greetings from './Greetings'
export default {
  name: 'Personal',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toGender() {
      this.REPLACE(Gender)
    },
    toGreetings() {
      this.REPLACE(Greetings)
    }
  }
}
</script>

<style scoped>
.content {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 24px;
}
</style>
