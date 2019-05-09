<template>
  <v-ons-page>
    <the-custom-toolbar
      :backLabel="volver"
      :pageTitle="toolbarTitle"
    ></the-custom-toolbar>
    <div class="container">
      <v-ons-button
        name="returnButton"
        class="return__button"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onReturn"
      >{{ $t('lang.components.button.OK') }}</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'terms-service',
  data() {
    return {
      isActive: false,
      volver: ''
    }
  },
  computed: {
    toolbarTitle() {
      return this.$t('lang.pages.service.toolbar.title')
    }
  },
  methods:{
    ...mapMutations('navigator', ['POP']),
    onReturn() {
      this.POP()
    }
  }
}
</script>

<style scoped></style>
