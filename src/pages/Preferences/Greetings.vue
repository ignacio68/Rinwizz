<template>
  <v-ons-page id="greetings">
    <div class="container">
      <h1 style="text-align:center">¡¡Enhorabuena!!</h1>
      <br>
      <h3>Ya pudes comenzar a recibir tus alertas</h3>
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
  name: 'greetings',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),

    toHomePage() {
      this.PUSH(HomePage)
    }
  }
}
</script>

<style scoped>
</style>
