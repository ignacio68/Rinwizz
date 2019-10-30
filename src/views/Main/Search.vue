<template>
  <v-ons-page id="search">
    <the-custom-toolbar
      class="customToolbar"
      :page-title="$t('lang.views.search.toolbar')"
    />
    <div>
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
            {{ $t('lang.views.userLocation.address') }}
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
// import { mapGetters, mapActions } from 'vuex'
// import LocationMap from '@components/Geolocation/LocationMap'

export default {
  name: 'Search',
  components: {
    // LocationMap
  },
  data() {
    return {
      showMarkers: true
    }
  },
  computed: {
    // ...mapGetters('location', {
    //   userLocation: 'USER_LOCATION',
    //   userAddress: 'USER_ADDRESS'
    // })
    // ----------------changeShowMarkers: () => return (this.showMarkers = !this.showMarkers)
  },
  created() {
    // this.getUserLocation()
    // this.getUserAddress()
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
