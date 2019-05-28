<template>
  <v-map
    ref="map"
    class="map__map"
    :zoom="initialZoom"
    :center="location"
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
      :lat-lng="location"
      :draggable="true"
      :autopan="false"
      @dragend="onDragEnd"
    >
      <v-popup :content="mapMarker.tooltip" />
    </v-marker>
    <v-circle-marker
      :lat-lng="location"
      :radius="circle.radius"
      :color="circle.color"
      :stroke="circle.stroke"
      :weight="circle.weight"
      :opacity="circle.opacity"
      :fillOpacity="circle.fillOpacity"
    />
    <v-circle-marker
      :lat-lng="location"
      :radius="circle2.radius"
      :color="circle2.color"
      :stroke="circle2.stroke"
      :weight="circle2.weight"
      :opacity="circle2.opacity"
      :fillOpacity="circle2.fillOpacity"
    />
    <v-locatecontrol />
  </v-map>
</template>
<script>
import { LMap, LTileLayer, LMarker, LCircleMarker, LPopup } from 'vue2-leaflet'
// import { latLng } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'

export default {
  name: 'location',
  components: {
    'v-map': LMap,
    'v-tile-layer': LTileLayer,
    'v-marker': LMarker,
    'v-circle-marker': LCircleMarker,
    'v-popup': LPopup,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  props: {
    location: {
      type: Object,
      default: {}
    },
    initialZoom: {
      type: Number,
      default: null
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
      center: [],
      zoom: null,
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
      // this.marker = this.$refs.marker
      this.marker = this.$refs.marker
      console.log('marker: ' + this.marker)
    })
    // this.$refs.marker.on('click', this.onDragEnd, this)
    if (!this.$refs.marker) {
      console.log('El marker NO existe')
    } else {
      console.log('El marker SI existe')
    }
  },
  computed: {
    markerLocation: () => this.marker.getLatlng()
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    // utilizamos la posición del usuario como centro inicial del mapa
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    // TODO: revisar su utilización
    onDragEnd() {
      console.log('Estoy en onDragEnd')
      // const position =
      // lat = position['lat']
      // lng = position['lng']
      this.location = this.marker.getLatlng()
    }
  }
}
</script>
<style scoped>
.map__map {
  border: 1px, solid, blue;
}
</style>

