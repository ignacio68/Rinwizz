<template>
  <v-ons-page class="editAlert">
    <the-custom-toolbar class="customToolbar"></the-custom-toolbar>

    <div class="content">
      <!-- <alert-script>
      </alert-script> -->
      <h3>Aquí se escribe la alerta</h3>
      <br>
      <v-ons-button
        class="toHomePage__button"
        name="toHomePageButton"
        :disabled="false"
        ripple="true"
        @click.prevent="toHomePage"
      >Volver</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
// import alertScript from '@components/Alerts/alertScript'
import AppSplitter from '@pages/AppSplitter'
import { mapMutations } from 'vuex'
export default {
  name: 'editAlert',
  components: {
    // alertScript
  },
  methods: {
    ...mapMutations('navigator', ['OPTIONS', 'REPLACE']),
    toHomePage() {
      this.OPTIONS({
        animation: 'fade',
        callback: () => this.OPTIONS({})
      })
      this.REPLACE(AppSplitter)
    }
  }
}
</script>

<style>
</style>
