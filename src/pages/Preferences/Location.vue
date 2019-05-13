<template>
  <v-ons-page>
    <div class="container">
      <h3>Aquí van la localización del usuario</h3>
      <br>
      <l-map
        style="height: 80%; width: 100%"
        :zoom="zoom"
        :center="center"
        @updateate:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
      </l-map>
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
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import Preferences from './Preferences'

export default {
  name: 'location',
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null
    }
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),

    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },

    toPreferences() {
      this.PUSH(Preferences)
    }
  }
}
</script>

<style scoped>
</style>
