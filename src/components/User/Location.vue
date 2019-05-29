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
      alt="user position"
      :lat-lng="location"
      :draggable="true"
      :autopan="true"
      @dragend="onDragEnd"
    >
      <!--v-marker
      v-for="marker in markers"
      ref="marker"
      :key="marker.id"
      :lat-lng="location"
      :draggable="true"
      @dragend="onDragEnd"
    -->
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
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import { maps } from '@setup/maps'

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
      maps: maps,
      center: [],
      zoom: null,
      // markerLocation: {},
      bounds: null,
      markers: [L.latLng(47.41722, -1.222482)],
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
    // utilizamos la posición del usuario como centro inicial del mapa
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    // TODO: revisar su utilización
    onDragEnd(event) {
      console.log('Estoy en onDragEnd')
      if (this.marker) {
        // this.marker.getLatlng()
        console.log('El marker SI existe')
        console.log(event.distance)
        console.log(this.marker)
        // console.log(this.marker.latLng.lat)
        // console.log(this.marker.latLng.lng)
        //  console.log(this.marker.latLng.lat)
        //  console.log(this.marker.latLng.lng)
        console.log(this.marker.getLanLng())
      } else {
        console.log('El marker NO existe')
      }
    }
  }
}
</script>
<style scoped>
.map__map {
  border: 1px, solid, blue;
}
</style>

