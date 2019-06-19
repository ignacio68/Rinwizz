<template>
  <v-ons-page id="avatar">
    <the-custom-toolbar class="customToolbar" :pageTitle="$t('lang.pages.alerts.toolbar')"></the-custom-toolbar>

    <div class="container">
      <h5>Elije una imágen que te represente</h5>
      <img v-if="imagePath !== ''" v-bind:src="imagePath">
      <v-ons-button
        class="avatarButton"
        name="avatarButton"
        :disabled="false"
        ripple="true"
        @click.prevent="getAvatar"
      >Galeria</v-ons-button>
    </div>
    <br>
    <div class="gender">
      <v-ons-button
        class="gender__button"
        name="genderButton"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="toGender"
      >{{ $t('lang.pages.personal.button') }}</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import gender from './Gender'
export default {
  name: 'avatar',
  namespace: true,
  data() {
    return {
      imagePath: ''
    }
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),

    getAvatar() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
          //sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        })
      } else {
        console.log('No hay camara')
      }
    },
    setPicture(imagePath) {
      this.imagePath = imagePath
    },
    error() {
      console.log('Error')
    },
    toGender() {
      this.REPLACE(gender)
    }
  }
}
</script>

<style>
</style>
