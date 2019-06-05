<template>
  <v-map
    ref="map"
    class="map__map"
    :zoom="initialZoom"
    :center="location"
    :inertia="true"
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
      :lat-lng="markerLocation"
      :radius="circle.radius"
      :color="circle.color"
      :stroke="circle.stroke"
      :weight="circle.weight"
      :opacity="circle.opacity"
      :fillOpacity="circle.fillOpacity"
    />
    <v-feature-group
      v-if="showMarkers"
      class="groupMarkers"
      ref="markers"
    >
      <!----- SOLO ES UNA PRUEBA ----->
      <v-marker
        class="groupMarkers_marker"
        alt="marker position"
        :lat-lng="[40.423819772625954, -3.713185787200928]"
      />
      <!------------------------------>
    </v-feature-group>
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
  LFeatureGroup
} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import { maps } from '@setup/maps'

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
  name: 'locationMap',
  components: {
    'v-map': LMap,
    'v-tile-layer': LTileLayer,
    'v-marker': LMarker,
    'v-circle-marker': LCircleMarker,
    'v-popup': LPopup,
    'v-feature-group': LFeatureGroup,
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
    },
    showMarkers: {
      type: Boolean,
      default: false
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
    /**
     * Pone en funcionamiento el marcador de posición del usuario
     */
    this.$nextTick(() => {
      this.marker = this.$refs.marker.mapObject
      this.markerLocation = this.location
      console.log('Estoy en mounted y lat es: ' + this.markerLocation.lat)
    })
  },
  computed: {},

  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = this.markerLocation
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },

    // TODO: revisar su utilización
    onDrag() {
      this.markerLocation = this.marker.getLatLng()
      this.$refs.map.mapObject.panTo(this.markerLocation)
    },
    onDragEnd() {
      if (this.marker) {
        // this.marker.getLatlng()
        console.log('El marker SI existe')
        this.markerLocation = this.marker.getLatLng()
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
.groupMarkers_marker {
  width: 75%;
}
</style>
