<template>
  <l-map
    class="map__map"
    :zoom="zoom"
    :center="location"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="maps.url" :atribution="maps.atribution"/>
    <l-marker
      ref="marker"
      class="map__marker"
      :lat-lng="location"
      :draggable="true"
      :autopan="false"
      @dragend="onDragEnd"
    >
      <l-popup :content="mapMarker.tooltip"/>
    </l-marker>
    <l-circle-marker
      :lat-lng="location"
      :radius="circle.radius"
      :color="circle.color"
      :stroke="circle.stroke"
      :weight="circle.weight"
      :opacity="circle.opacity"
      :fillOpacity="circle.fillOpacity"
    />
    <l-circle-marker
      :lat-lng="location"
      :radius="circle2.radius"
      :color="circle2.color"
      :stroke="circle2.stroke"
      :weight="circle2.weight"
      :opacity="circle2.opacity"
      :fillOpacity="circle2.fillOpacity"
    />
    <v-locatecontrol/>
  </l-map>
</template>
<script>
import { LMap, LTileLayer, LMarker, LCircleMarker, LPopup } from 'vue2-leaflet'
// import { latLng } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'

export default {
  name: 'location',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LPopup,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  props: {
    location: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      maps: {
        // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        atribution:
          // This atribution is when the map owner is stamen.com in terrain mode
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
      },
      zoom: 17,
      center: [],
      markerLatLng: [],
      bounds: null,
      marker: null,
      mapMarker: {
        tooltip: 'Esta es tu posición'
      },
      circle: {
        radius: 25,
        stroke: true,
        color: 'blue',
        weight: 5,
        opacity: 0.5,
        fillOpacity: 0.3
      },
      circle2: {
        radius: 100,
        stroke: false,
        fillOpacity: 0.3
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.marker = this.$refs.marker
      console.log('marker: ' + this.marker)
    })
  },
  computed: {},
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
    onDragEnd() {
      console.log('Estoy en setLocation')
      const position = this.marker.getLatLng()
      lat = position['lat']
      lng = position['lng']
      this.location = [lat, lng]
    }
  }
}
</script>
<style scoped>
.map__map {
  border: 1px, solid, blue;
}
</style>

