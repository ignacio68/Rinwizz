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
import Location from './Location'
export default {
  name: 'personal',
  data: () => {},
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toUserLocation() {
      this.REPLACE(Location)
    }
  }
}
</script>

<style scoped>
</style>
