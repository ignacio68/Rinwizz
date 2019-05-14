<template>
  <v-ons-page>
    <v-ons-col class="col">
      <h3 class="text">Elige tu localización</h3>
      <div class="map">
        <l-map
          class="map__map"
          :zoom="zoom"
          :center="userLocation"
          @updateate:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :latLng="markerLatLng"></l-marker>
          <v-locatecontrol/>
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
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import Preferences from './Preferences'

export default {
  name: 'location',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  data() {
    return {
      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      zoom: 17,
      center: [40.455761, -3.680087],
      markerLatLng: [40.455761, -3.680087],
      bounds: null,
      location: []
    }
  },

  created() {
    console.log('Estoy en Location.created')
  },
  beforeMount() {
    console.log('Estoy en Location.beforeMount')
    // console.log('la latitud es: ' + userLocation.latitude)
    this.GET_USER_LOCATION()
  },
  computed: {
    ...mapGetters('location', { userLocation: 'USER_LOCATION' }),
    setLocation: location => []
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapActions('location', ['GET_USER_LOCATION']),

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
@import '~leaflet/dist/leaflet.css';

.text {
  text-align: center;
}
.col {
  border: 1px, solid, green;
  margin-left: 5%;
  width: 90%;
  height: 90%;
}
.map {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 90%;
  border: 1px, solid, red;
}
.map__map {
  border: 1px, solid, blue;
}
</style>
