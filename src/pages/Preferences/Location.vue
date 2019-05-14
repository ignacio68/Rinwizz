<template>
  <v-ons-page>
    <div class="container">
      <v-ons-col class="col">
        <h3>Aquí va la localización del usuario</h3>
        <div class="map">
          <l-map
            class="map__map"
            :zoom="zoom"
            :center="center"
            @updateate:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
          >
            <l-tile-layer :url="url"></l-tile-layer>
          </l-map>
        </div>
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
      </v-ons-col>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import Preferences from './Preferences'

export default {
  name: 'location',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 16,
      center: [40.455761, -3.680087],
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
.col {
  border: 1px, solid, green;
}
.map {
  display: block;
  width: 300px;
  height: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px, solid, red;
}
.map__map {
  border: 1px, solid, blue;
}
</style>
