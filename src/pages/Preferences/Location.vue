<template>
  <v-ons-page>
    <div class="container">
      <h3>Aquí van la localización del usuario</h3>
      <br>
      <div class="preferencesButton">
        <v-ons-button
          class="preferencesButton__button"
          name="preferencesButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toPreferences"
        >Continuar</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import Preferences from './Preferences'
export default {
  name: 'location',
  data: () => {},
  methods: {
    ...mapMutations('navigator', ['PUSH']),

    toUserLocation() {
      this.PUSH(Preferences)
    }
  }
}
</script>

<style scoped>
</style>
