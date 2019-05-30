<template>
  <v-map
    ref="map"
    class="map__map"
    :zoom="initialZoom"
    :center="location"
    :inertia="true"
    @update:center="centerUpdated"
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
      :autoPan="true"
      @drag="onDrag"
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
    <v-control
      class="control"
      position="bottomleft"
    >
      <p class="control__p">{{ userAddress }}</p>
    </v-control>
    <v-locatecontrol :options="localeControlOptions" />
  </v-map>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircleMarker,
  LPopup,
  LControl
} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import { maps } from '@setup/maps'
import MyGeocoderPlugin from 'pelias-leaflet-plugin'

/**
 *  this part resolve an issue where the marker would not apear
 */
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'location',
  components: {
    'v-map': LMap,
    'v-tile-layer': LTileLayer,
    'v-marker': LMarker,
    'v-circle-marker': LCircleMarker,
    'v-popup': LPopup,
    'v-control': LControl,
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
      markerLocation: {},
      bounds: null,
      marker: null,
      mapMarker: {
        tooltip: 'Esta es tu posición'
      },
      circle: {
        radius: 10,
        stroke: true,
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillOpacity: 0.3
      },
      userAddress: 'Aquí va la dirección del usuario',
      localeControlOptions: {
        position: 'bottomright',
        icon: 'fas fa-bullseye',
        strings: {
          popup: 'Te llevo a donde estás ahora'
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.marker = this.$refs.marker.mapObject
      console.log('marker: ' + this.marker)
    })
  },
  computed: {
    setUserAdress(userAddress) {
      this.userAddress = userAddress
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
    },
    getUserAdress() {
      this.setUserAddress(userAddress)
    },
    // TODO: revisar su utilización
    onDrag() {
      this.markerLocation = this.marker.getLatLng()
      console.log(this.markerLocation)
    },
    onDragEnd() {
      console.log('Estoy en onDragEnd')
      if (this.marker) {
        // this.marker.getLatlng()
        console.log('El marker SI existe')

        console.log(this.marker.getLatLng())
      } else {
        console.log('El marker NO existe')
      }
    }
  }
}
</script>
<style scoped>
@import '~leaflet/dist/leaflet.css';
.map__map {
  border: 1px, solid, blue;
}
.control {
  background-color: white;
}
</style>

