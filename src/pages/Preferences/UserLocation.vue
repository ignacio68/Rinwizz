<template>
  <v-ons-page id="userLocation">
    <v-ons-col class="col">
      <h3 class="text">{{ $t('lang.pages.userLocation.main') }}</h3>
      <div class="map">
        <location :location="userLocation" @onDragEndEvent()="setLocation"/>
      </div>
      <div class="preferencesButton">
        <v-ons-button
          class="preferencesButton__button"
          name="preferencesButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toPreferences"
        >{{ $t('lang.pages.userLocation.button') }}</v-ons-button>
      </div>
    </v-ons-col>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

import location from '@components/User/Location'

import Hobbies from './Hobbies'

export default {
  name: 'userLocation',
  components: {
    location
  },
  data() {
    return {}
  },
  computed: {
    userLocation() {
      console.log('estoy en userLocation()')
      return {
        lat: this.$store.state.geolocation.lat,
        lng: this.$store.state.geolocation.lng
      }
    }
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    toPreferences() {
      this.PUSH(Preferences)
    },
    setLocation() {
      this.location = getLatLng()
      console.log('Estoy en setLocation')
    }
  }
}
</script>

<style scoped>
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
</style>
