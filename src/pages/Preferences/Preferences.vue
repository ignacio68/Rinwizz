<template>
  <v-ons-page>
    <div class="container">
      <h3>Aquí van las preferencias del usuario</h3>
      <br>
      <div class="homePageButton">
        <v-ons-button
          class="homePageButton__button"
          name="homePageButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toHomePage"
        >Comenzar!!</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import HomePage from '@pages/HomePage'
export default {
  name: 'preferences',
  data: () => {},
  methods: {
    ...mapMutations('navigator', ['PUSH']),

    toUserLocation() {
      this.PUSH(toHomePage)
    }
  }
}
</script>

<style scoped>
</style>
