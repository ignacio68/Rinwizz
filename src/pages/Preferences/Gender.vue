<template>
  <v-ons-page>
    <div class="container">
      <p>Elige tu género</p>
      <v-ons-list>
        <v-ons-list-item
          v-for="(gender, $index) in genders"
          :key="gender"
          tappable
        >
          <label class="left">
            <v-ons-radio
              :input-id="'radio-' + $index"
              :value="gender"
              v-model=" selectedGender"
            >
            </v-ons-radio>
          </label>
          <label
            :for="'radio-' + $index"
            class="center"
          >
            {{ gender }}
          </label>
        </v-ons-list-item>
      </v-ons-list>
      <br>
      <div class="userLcationButton">
        <v-ons-button
          class="userLocationButton__button"
          name="userLocationButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toUserLocation"
        >Continuar</v-ons-button>
      </div>
    </div>
  </v-ons-page>
  </div>

</template>
<script>
import { mapMutations } from 'vuex'
import userLocation from './UserLocation'
export default {
  name: 'gender',
  namespace: true,
  data() {
    return {
      genders: ['Male', 'Female', 'Other'],
      selectedGender: ''
    }
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toUserLocation() {
      this.REPLACE(userLocation)
    }
  }
}
</script>
<style scoped>
</style>
