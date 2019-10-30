<template>
  <v-ons-page id="userLocation">
    <div class="content">
      <v-ons-col class="col">
        <h3 class="text">{{ $t('lang.views.userLocation.main') }}</h3>
        <div class="map">
          <LocationMap :location="userLocation" :initial-zoom="17" :show-markers="showMarkers" />
        </div>
        <div class="address">
          <p>
            {{ $t('lang.views.userLocation.address') }}
            <span>
              <h5>{{ userAddress.suburb }}</h5>
            </span>
          </p>
        </div>
        <v-row class="row">
          <div class="showMarkersButton">
            <v-ons-button
              class="showMarkersButton__button"
              name="showMarkersButton"
              modifier="short"
              :disabled="false"
              ripple="true"
              @click.prevent="changeShowMarkers"
            >marcadores</v-ons-button>
            {{ showMarkers }}
          </div>
        </v-row>
      </v-ons-col>

      <v-ons-row class="buttons">
        <v-ons-button
          class="skip__button"
          name="skipButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toHobbies"
        >
          {{ $t('lang.buttons.skip') }}
        </v-ons-button>
        <v-ons-button
          class="preferencesButton__button"
          name="preferencesButton"
          modifier="short"
          :disabled="false"
          ripple="true"
          @click.prevent="updateUserLocation"
        >
          {{ $t('lang.views.userLocation.button') }}
        </v-ons-button>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
// import { updateDoc } from '@services/database'
import LocationMap from '@components/Geolocation/LocationMap'
import Hobbies from './Hobbies'

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
  computed: {
    // ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('location', {
      userLocation: 'USER_LOCATION',
      userAddress: 'USER_ADDRESS'
    })
    // changeShowMarkers: () => return (this.showMarkers = !this.showMarkers)
  },
  created() {
    this.getUserLocation()
    this.getUserAddress()
  },
  methods: {
    ...mapActions('location', ['GET_CURRENT_POSITION', 'CURRENT_ADDRESS']),
    ...mapMutations('user', ['UPDATE_USER']),
    ...mapMutations('navigator', ['REPLACE']),

    async getUserLocation() {
      await this.GET_CURRENT_POSITION()
    },
    async getUserAddress() {
      await this.CURRENT_ADDRESS()
    },

    updateUserLocation() {
      const userData = { location: '', address: [] }
      userData.location = this.userLocation
      userData.address.push(this.userAddress)
      this.UPDATE_USER(userData)
      this.toGHobbies()
    },
    toHobbies() {
      // console.log('Los datos de usuario son: ' + user)
      // await updateDoc('users', this.user.id, this.user)
      this.REPLACE(Hobbies)
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
