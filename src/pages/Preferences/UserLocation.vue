<template>
  <v-ons-page id="userLocation">
    <v-ons-col class="col">
      <h3 class="text">{{ $t('lang.pages.userLocation.main') }}</h3>
      <div class="map">
        <location :location="userLocation" :initialZoom="17"/>
      </div>
      <div class="preferencesButton">
        <v-ons-button
          class="preferencesButton__button"
          name="preferencesButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="updateUserLocation"
        >{{ $t('lang.pages.userLocation.button') }}</v-ons-button>
      </div>
    </v-ons-col>
  </v-ons-page>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import location from '@components/User/Location'

import Greetings from './Greetings'

export default {
  name: 'userLocation',
  components: {
    location
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('geolocation', {
      lat: state => state.lat,
      lng: state => state.lng
    }),
    ...mapGetters('user', { userId: 'USER_ID' }),
    userLocation() {
      console.log('estoy en userLocation()')
      return {
        lat: this.lat,
        lng: this.lng
      }
    }
  },
  methods: {
    ...mapActions('userDb', ['UPDATE_USER_DB']),
    ...mapMutations('navigator', ['PUSH']),

    async updateUserLocation() {
      const data = {
        location: this.userLocation
      }
      const userData = { userId: this.userId, data }
      await this.UPDATE_USER_DB(userData)
      await this.toPreferences()
    },
    toPreferences() {
      this.PUSH(Greetings)
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
