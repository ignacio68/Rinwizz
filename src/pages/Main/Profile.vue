<template>
  <v-ons-page>
    <div class="container">

      <div class="picture">
        
          <img src="../../assets/user_icon.png" alt="user icon" class="picture__frame-photo"/>
        
      </div>

      <form>
        <v-ons-list class="profileList">
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.pages.profile.main.list.input.name') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input
                id="name"
                type="name"
                :placeholder="userName"
                float
                modifier="transparent"
                v-model="name"
                required
              />
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.pages.profile.main.list.input.email') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input
                id="email"
                type="email"
                :placeholder="userEmail"
                float
                
                disabled
              />
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="profileList__item">
            <div class="left profileList__item-label">
              <label for="textImput">{{ $t('lang.pages.profile.main.list.input.location') }}</label>
            </div>
            <div class="center profileList__item-input">
              <v-ons-input
                id="location"
                type="text"
                :placeholder="userLocation"
                float
                modifier="transparent"
                v-model="location"
              />
            </div>
          </v-ons-list-item>
          <v-ons-list-header class="profileList__header">
            {{ $t('lang.pages.profile.main.list.header1') }}
          </v-ons-list-header>
        </v-ons-list>
      </form>
      
       <v-ons-button
        name="onClick"
        class="profileButton"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.pages.profile.main.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'profile',
    data () {
      return {
        name: '',
        location: ''
      }
    },
    computed: {
      userEmail () {
        // let userEmail = this.$store.getters['user/user']
        let userEmail = window.localStorage.getItem('email')
        console.log('el email el usuario es: ' + userEmail)
        return userEmail
      },
      userName () {
        // let userName = this.$store.getters['user/user']
        let userName = window.localStorage.getItem('userName')
        console.log('el nombre de usuario es: ' + userName)
        return userName
      },
      userLocation () {
        // let userLocation = this.$store.getters['user/user']
        let userLocation = window.localStorage.getItem('location')
        console.log('la localización del usuario es: ' + userLocation.location)
        return userLocation
      }
    },
    methods: {
      onSave () {
        const user = {}
        user.userName = this.userName
        user.location = this.userLocation
        this.$store.dispatch('user/updatedUserInfo', user)
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
  transform: translate(-50%, -50%)
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
.profileList__item-input{
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 3px;
  border: 1px solid blue;
}
.profileList__item-input[type="email"]{
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
