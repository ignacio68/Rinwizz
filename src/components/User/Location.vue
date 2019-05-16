<template>
  <l-map
    class="map__map"
    :zoom="zoom"
    :center="location"
    @updateate:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :latLng="markerLatLng"></l-marker>
    <v-locatecontrol/>
  </l-map>
</template>
<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
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
      bounds: null
    }
  },
  computed: {
    location() {
      // TODO: añadir error this.$store.state.geolocation.error
      console.log('estoy en location()')
      return {
        lat: this.$store.state.geolocation.lat,
        lng: this.$store.state.geolocation.lng
      }
    }
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    }
  }
}
</script>
<style scoped>
@import '~leaflet/dist/leaflet.css';
.map__map {
  border: 1px, solid, blue;
}
</style>

