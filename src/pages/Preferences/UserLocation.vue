<template>
  <v-ons-page id="userLocation">
    <v-ons-col class="col">
      <h3 class="text">{{ $t('lang.pages.userLocation.main') }}</h3>
      <div class="map">
        <location-map :location="userLocation" :initialZoom="17" :showMarkers="false"/>
      </div>
      <div class="address">
        <p>
          {{ $t('lang.pages.userLocation.address') }}
          <span>
            <h5>{{ userAddress.suburb }}</h5>
          </span>
        </p>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LocationMap from '@components/User/LocationMap'
import Greetings from './Greetings'

export default {
  name: 'UserLocation',
  components: {
    LocationMap
  },
  data() {
    return {}
  },
  mounted() {
    this.getUserLocation()
    this.getUserAddress()
  },
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' }),
    ...mapGetters('location', {
      userLocation: 'USER_LOCATION',
      userAddress: 'USER_ADDRESS'
    })
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
