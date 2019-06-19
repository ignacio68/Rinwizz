<template>
  <v-ons-page id="personal">
    <div class="container">
      <h4>{{ $t('lang.pages.personal.main') }}</h4>
      <br>
      <div class="gender">
        <v-ons-button
          class="gender__button"
          name="genderButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toGender"
        >{{ $t('lang.pages.personal.button') }}</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import avatar from './Avatar'
export default {
  name: 'personal',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toGender() {
      this.REPLACE(avatar)
    }
  }
}
</script>

<style scoped>
.container {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 24px;
}
</style>
