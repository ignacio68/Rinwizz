<template>
  <v-ons-page id="avatar">
    <div class="content">
      <h5>{{ $t('lang.pages.avatar.main') }}</h5>
      <!-- TODO: mostrar icono cuando no haya imágen elegida -->
      <img
        v-if="imageUrl !== ''"
        :src="imageUrl"
        style="display:none"
        id="avatar"
        height="150px"
      />
      <!-- TODO: cambiar según plataforma -->
      <v-ons-button
        class="avatarButton"
        name="avatarButton"
        :disabled="false"
        ripple="true"
        @click.prevent="getAvatar"
      >
        {{ $t('lang.pages.avatar.avatarButton') }}
        <v-ons-input
          v-if="platform === 'pc'"
          style="display: none"
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
        />
      </v-ons-button>
    </div>
    <br />
    <div class="gender">
      <v-ons-button
        class="gender__button"
        name="genderButton"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="toGender"
      >{{ $t('lang.pages.avatar.button') }}</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { capturePhoto, getPhoto } from '@services/camera'
import gender from './Gender'
export default {
  name: 'avatar',
  namespace: true,
  data() {
    return {
      platform: '',
      imageUrl: '',
      image: null
    }
  },
  created() {
    // this.$ons.platform.select('chrome')
  },
  mounted() {
    if (this.$ons.platform.isIOS() || this.$ons.platform.isAndroid()) {
      this.platform = 'cordova'
      console.log('La plataforma es: ' + this.platform)
    } else {
      this.platform = 'pc'
      console.log('La plataforma es: ' + this.platform)
    }
  },
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' })
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapActions('cloudStorage', ['PUT_FILE']),

    async getAvatar() {
      console.log('Estoy en getAvatar()')
      if (navigator.camera) {
        // navigator.camera.getPicture(this.setPicture, this.error, {
        // destinationType: navigator.camera.DestinationType.FILE_URI,
        // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        // sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        // })
        this.image = capturePhoto()
      } else {
        console.log('No hay camara')
      }
      console.log('La imagen es: ' + this.image)
      const userData = {
        userId: this.userId,
        avatar: this.image,
        metadata: 'avatar'
      }
      await this.PUT_FILE(userData)
    },
    async onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Elige un archivo válido')
      }
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageUrl = fileReader.result
      }
      await fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    setPicture(imageUrl) {
      this.imageUrl = imageUrl
    },
    error() {
      console.log('Error')
    },
    async toGender() {
      await this.PUSH(gender)
    }
  }
}
</script>

<style></style>
