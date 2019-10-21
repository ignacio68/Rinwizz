<template>
  <v-ons-page id="profile">
    <the-custom-toolbar class="customToolbar" :pageTitle="$t('lang.views.profile.toolbar')"></the-custom-toolbar>
    <div class="content">
      <h5 class="dummyText">Hola {{ user.name }} estas son tus alertas</h5>
      <div class="picture">
        <img :src="user.avatar" alt="user photo" class="picture__frame-photo" />
        <!-- <img :src="../../assets/user_icon.png" alt="user photo" class="picture__frame-photo" /> -->
      </div>
      <form>
        <v-ons-list class="profileList">
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.views.profile.main.list.input.name') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input
                id="name"
                type="name"
                :placeholder="user.name"
                float
                modifier="transparent"
                v-model="name"
                required
              />
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.views.profile.main.list.input.email') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input id="email" type="email" :placeholder="user.email" float />
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.views.profile.main.list.input.location') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input
                id="location"
                type="text"
                :placeholder="user.location"
                float
                modifier="transparent"
                v-model="location"
              />
            </div>
          </v-ons-list-item>
          <v-ons-list-header
            class="profileList__header"
          >{{ $t('lang.views.profile.main.list.header1') }}</v-ons-list-header>
        </v-ons-list>
      </form>

      <v-ons-button
        name="onClick"
        class="profileButton"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >{{ $t('lang.views.profile.main.button') }}</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  data() {
    return {
      name: '',
      email: '',
      location: ''
    }
  },
  created() {
    console.log('Profile.vue created()')
  },
  // watch: {
  //   user() {
  //     console.log('WATCH: El usuario ha cambiado')
  //   }
  // },
  // watch: {
  //   user(value) {
  //     if (value) {
  //       console.log('Hay que actualizar el user')
  //     } else {
  //       console.log('No ha cambiado nada')
  //     }
  //     deep: true
  //   }
  // },

  computed: {
    ...mapGetters('user', { user: 'USER' })
  },
  methods: {
    /**
     * TODO: revisar
     * Al salvar guarda los cambios en los datos del usuario (nombre y localización)
     */
    onSave() {
      const newUser = {}
      newUser.name = this.userName
      newUser.location = this.userLocation
      this.$store.dispatch('user/updatedUserInfo', newUser)
      console.log('Guardo los cambios')
    }
  }
}
</script>
<style scoped>
.picture {
  position: relative;
  height: 150px;
  width: 100%;
  background-color: orange;
}
.picture__frame-photo {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.profileList__item {
  border: 1px solid red;
}
.profileList__item-label {
  font-size: 90%;
  font-style: italic;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid green;
}
.profileList__item-input {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 3px;
  border: 1px solid blue;
}
.profileList__item-input[type='email'] {
  color: green;
  font-size: 100px;
  background-color: yellow;
}
.profileButton {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
