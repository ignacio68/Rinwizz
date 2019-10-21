<template>
  <v-ons-page id="personal">
    <div class="content">
      <h4>{{ $t('lang.views.personal.main') }}</h4>
      <br />
      <div class="gender">
        <v-ons-button
          class="gender__button"
          name="genderButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toAvatar"
          >{{ $t('lang.views.personal.button') }}</v-ons-button
        >
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import Gender from './Gender'
export default {
  name: 'personal',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    async toAvatar() {
      await this.REPLACE(Gender)
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
