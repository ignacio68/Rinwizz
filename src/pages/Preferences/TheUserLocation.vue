<template>
  <v-ons-page id="userLocation">
    <div class="map">
      <map-component />
    </div>
  </v-ons-page>
</template>

<script>
import mapComponent from '@components/User/mapComponent'
export default {
  name: 'userLocation',
  components: {
    mapComponent
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
