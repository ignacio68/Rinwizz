<template>
  <v-ons-page id="avatar">
    <div class="content">
      <v-ons-row>
        <v-ons-col>
          <h5>{{ $t('lang.views.avatar.main') }}</h5>
          <!-- TODO: mostrar icono cuando no haya imágen elegida -->
          <img
            v-if="imageUrl !== null || imageUrl !== undefinied"
            id="avatar"
            :src="imageUrl"
            style="display:none"
            height="150px"
          />
        </v-ons-col>
      </v-ons-row>
      <!-- TODO: cambiar según plataforma -->
      <v-ons-row>
        <v-ons-button
          class="avatarButton"
          name="avatarButton"
          :disabled="false"
          ripple="true"
          @click.prevent="getAvatar"
        >
          {{ $t('lang.views.avatar.avatarButton') }}
          <!-- TODO: añadir el parámetro multiple si se quiere permitir
          seleccionar varios archivos-->
          <v-ons-input
            id="avatar"
            ref="fileInput"
            name="avatar"
            style="display: none"
            type="file"
            accept="image/gif, image/jpeg, image/png"
            @change="onFilePicked"
          />
          <!-- <v-ons-input
            v-if="platform === 'pc'"
            ref="fileInput"
            style="display: none"
            type="file"
            accept="image/*"
            @change="onFilePicked"
          />-->
        </v-ons-button>
      </v-ons-row>

      <v-ons-row>
        <v-ons-button
          class="gender__button"
          name="genderButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toGender"
          >{{ $t('lang.views.avatar.button') }}</v-ons-button
        >
      </v-ons-row>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// TODO: utilizar en el desarrollo de la app para movil
import { capturePhoto, getPhoto } from '@services/camera/index'
import gender from './Gender'
export default {
  name: 'Avatar',
  namespace: true,
  data() {
    return {
      platform: void 0,
      imageUrl: void 0,
      image: void 0
    }
  },
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' })
  },
  created() {
    // this.$ons.platform.select('chrome')
  },
  // mounted() {
  //   if (this.$ons.platform.isIOS() || this.$ons.platform.isAndroid()) {
  //     this.platform = 'cordova'
  //     console.log('La plataforma es: ' + this.platform)
  //   } else {
  //     this.platform = 'pc'
  //     console.log('La plataforma es: ' + this.platform)
  //   }
  // },
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
        this.image = await capturePhoto()
      } else {
        console.log('No hay camara')
        // TODO: revisar!!
        this.image = await getPhoto()
      }
      // this.$refs.fileInput.$el.click()
      // await this.onFilePicked()
      //   .then(async image => {
      //     console.log('La imagen es: ' + image)
      //     const imageData = {
      //       userId: this.userId,
      //       avatar: image,
      //       metadata: 'avatar'
      //     }
      //     console.log('imageData es: ' + imageData)
      //     await this.PUT_FILE(imageData)
      //   })
      //   .catch(error => console.log('getAvatar error: ' + error))
    },
    // Utilizar en Windows para elegir una imagen - pruducción
    async onFilePicked(event) {
      console.log('onFilePicked')
      // FileList object
      await event.target.files.then(async files => {
        console.log('files: ' + files)
        // Comprueba que es un archivo válido
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Elige un archivo válido') // Internacionalizar
        }

        let fileReader = new FileReader()
        fileReader.onload = () => {
          this.imageUrl = fileReader.result
        }
        const imageData = await fileReader.readAsDataURL(files[0])
        this.image = imageData
        return imageData
        // this.image = files[0]
      })
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

<style>
.gender__button {
  margin-top: 16px;
}
</style>
