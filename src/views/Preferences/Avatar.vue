<template>
  <v-ons-page id="avatar">
    <div class="content">
      <h5>{{ $t('lang.views.avatar.main') }}</h5>
      <!-- TODO: mostrar icono cuando no haya imágen elegida -->
      <img
        v-if="imageUrl !== null || imageUrl !== indefinied"
        id="avatar"
        :src="imageUrl"
        style="display:none"
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
        {{ $t('lang.views.avatar.avatarButton') }}
        <v-ons-input
          v-if="platform === 'pc'"
          ref="fileInput"
          style="display: none"
          type="file"
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
        >{{ $t('lang.views.avatar.button') }}</v-ons-button
      >
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { capturePhoto, getPhoto } from '@services/camera/index'
import gender from './Gender'
export default {
  name: 'Avatar',
  namespace: true,
  data() {
    return {
      platform: null,
      imageUrl: null,
      image: null
    }
  },
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' })
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
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapActions('cloudStorage', ['PUT_FILE']),
    // TODO: revisar, hacer solo para Windows
    async getAvatar() {
      console.log('Estoy en getAvatar()')
      if (navigator.camera) {
        // navigator.camera.getPicture(this.setPicture, this.error, {
        // destinationType: navigator.camera.DestinationType.FILE_URI,
        // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        // sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        // })
        this.image = await capturePhoto()it
      } else {
        console.log('No hay camara')
        // TODO: revisar!!
        this.image = await getPhoto()
      }
      console.log('La imagen es: ' + this.image)
      const userData = {
        userId: this.userId,
        avatar: this.image,
        metadata: 'avatar'
      }
      await this.PUT_FILE(userData)
    },
    // Utilizar en Windows para elegir una imagen - pruducción
    async onFilePicked(event) {
      const files = await event.target.files

      // Comprueba que es un archivo con el nombre válido
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Elige un archivo válido') // Internacionalizar
      }

      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageUrl = fileReader.result
      }
      const imageData = await fileReader.readAsDataURL(files[0])
      this.image = imageData
      // this.image = files[0]
    },
    setPicture(imageUrl) {
      this.imageUrl = imageUrl
    },
    error() {
      console.log('Error')
    },
    toGender() {
      this.PUSH(gender)
    }
  }
}
</script>

<style></style>
