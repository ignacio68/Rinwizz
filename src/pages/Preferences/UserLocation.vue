<template>
  <v-ons-page id="userLocation">
    <v-ons-col class="col">
      <h3 class="text">{{ $t('lang.pages.userLocation.main') }}</h3>
      <div class="map">
        <location-map
          :location="userLocation"
          :initialZoom="17"
          :showMarkers="showMarkers"
        />
      </div>
      <div class="address">
        <p>
          {{ $t('lang.pages.userLocation.address') }}
          <span>
            <h5>{{ userAddress.suburb }}</h5>
          </span>
        </p>
      </div>
      <v-row class="row">
        <div class="preferencesButton">
          <v-ons-button
            class="preferencesButton__button"
            name="preferencesButton"
            modifier="short"
            :disabled="false"
            ripple="true"
            @click.prevent="updateUserLocation"
          >{{ $t('lang.pages.userLocation.button') }}</v-ons-button>
        </div>
        <div class="showMarkersButton">
          <v-ons-button
            class="showMarkersButton__button"
            name="showMarkersButton"
            modifier="short"
            :disabled="false"
            ripple="true"
            @click.prevent="changeShowMarkers"
          >marcadores</v-ons-button>{{ showMarkers }}
        </div>
      </v-row>
    </v-ons-col>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LocationMap from '@components/User/LocationMap'
import Greetings from './Greetings'

export default {
  name: 'UserLocation',
  components: {
    LocationMap
  },
  data() {
    return {
      showMarkers: true
    }
  },
  created() {
    this.getUserLocation()
    this.getUserAddress()
  },
  mounted() {},
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' }),
    ...mapGetters('location', {
      userLocation: 'USER_LOCATION',
      userAddress: 'USER_ADDRESS'
    })
    // changeShowMarkers: () => return (this.showMarkers = !this.showMarkers)
  },
  methods: {
    ...mapActions('userDb', ['UPDATE_USER_DB']),
    ...mapActions('location', ['GET_CURRENT_POSITION', 'CURRENT_ADDRESS']),
    ...mapMutations('navigator', ['REPLACE']),

    async getUserLocation() {
      await this.GET_CURRENT_POSITION()
    },
    async getUserAddress() {
      await this.CURRENT_ADDRESS()
    },

    async updateUserLocation() {
      const data = {
        location: this.userLocation,
        address: this.userAddress
      }
      const userData = { userId: this.userId, data }
      await this.UPDATE_USER_DB(userData)
      await this.toPreferences()
    },
    toPreferences() {
      this.REPLACE(Greetings)
    },
    changeShowMarkers() {
      return (this.showMarkers = !this.showMarkers)
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
.address .p {
  color: grey;
}
</style>
