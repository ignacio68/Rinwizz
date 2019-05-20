<template>
  <v-ons-page>
    <div class="container">
      <h4>Necesitamos unos datos tuyos para ofrcerte un mejor servicio</h4>
      <br>
      <div class="gender">
        <v-ons-button
          class="genderButton__button"
          name="genderButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toGender"
        >Continuar</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import gender from './Gender'
export default {
  name: 'personal',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    toGender() {
      this.REPLACE(gender)
    }
  }
}
</script>

<style scoped>
</style>
