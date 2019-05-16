<template>
  <v-ons-page>
    <div class="container">
      <h3>Aquí van el sexo, edad, etc. del usuario</h3>
      <br>
      <div class="userLcationButton">
        <v-ons-button
          class="userLocationButton__button"
          name="userLocationButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toUserLocation"
        >Continuar</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import userLocation from './UserLocation'
export default {
  name: 'personal',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toUserLocation() {
      this.REPLACE(userLocation)
    }
  }
}
</script>

<style scoped>
</style>
