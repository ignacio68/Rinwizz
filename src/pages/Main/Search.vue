<template>
  <v-ons-page id="search">
    <the-custom-toolbar class="customToolbar" :pageTitle="$t('lang.pages.search.toolbar')"></the-custom-toolbar>
    <div class="content">
      <h1>Página de búsquedas</h1>
      <!-- <v-ons-col class="col">
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
        <v-ons-button
          class="showMarkersButton__button"
          name="showMarkersButton"
          modifier="short"
          :disabled="false"
          ripple="true"
          @click.prevent="changeShowMarkers"
          >marcadores</v-ons-button
        >
      </v-ons-col>-->
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LocationMap from '@components/User/LocationMap'

export default {
  name: 'search',
  components: {
    LocationMap
  },
  data() {
    return {
      showMarkers: true
    }
  },
  created() {
    // this.getUserLocation()
    // this.getUserAddress()
  },
  computed: {
    // ...mapGetters('location', {
    //   userLocation: 'USER_LOCATION',
    //   userAddress: 'USER_ADDRESS'
    // })
    // ----------------changeShowMarkers: () => return (this.showMarkers = !this.showMarkers)
  },
  methods: {
    // ...mapActions('userDb', ['UPDATE_USER_DB']),
    // ...mapActions('location', ['GET_CURRENT_POSITION', 'CURRENT_ADDRESS']),
    // async getUserLocation() {
    //   await this.GET_CURRENT_POSITION()
    // },
    // async getUserAddress() {
    //   await this.CURRENT_ADDRESS()
    // },
    // changeShowMarkers() {
    //   return (this.showMarkers = !this.showMarkers)
    // }
  }
}
</script>

<style scoped></style>
