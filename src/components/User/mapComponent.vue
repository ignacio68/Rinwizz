<template>
  <v-map
    ref="map"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <v-tile-layer
      :url="maps.url"
      :atribution="maps.atribution"
    />
    <v-marker
      ref="marker"
      class="map__marker"
      alt="user position"
      :lat-lng="center"
      :draggable="true"
      @dragend="onDragEnd"
    >
    </v-marker>
  </v-map>
</template>
<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'location',
  components: {
    'v-map': LMap,
    'v-tile-layer': LTileLayer,
    'v-marker': LMarker
  },
  data() {
    return {
      maps: {
        url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        atribution: '&copy; <a href="http://stamen.com">Stamen Design</a>'
      },
      center: [40.5005, -3.66739],
      zoom: 17,
      bounds: null,
      marker: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.marker = this.$refs.marker
      console.log('marker: ' + this.marker)
    })
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
    },
    onDragEnd(event) {
      if (this.marker) {
        console.log(event.distance)
        console.log(this.marker)
        console.log(this.marker.getLanLng())
      } else {
        console.log('Error: NO MARKER')
      }
    }
  }
}
</script>
