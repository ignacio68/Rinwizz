<template>
  <v-ons-page id="alerts">
    <the-custom-toolbar class="customToolbar" :pageTitle="$t('lang.pages.alerts.toolbar')"></the-custom-toolbar>

    <div class="content">
      <!-- Las siguientes líneas son de prueba -- Se pueden elminar  -->
      <h5 class="dummyText">Hola {{ userName }} estas son tus alertas</h5>
      <h5 class="dummyText">
        Este es tu Avatar
        <span>
          <img class="alertCard__userAvatar" :src="userAvatar" />
        </span>
      </h5>
      <h5 v-if="isVerified" class="dummyText">Estás verificado</h5>

      <!-- Alerts list -->
      <v-ons-list class="alertsList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="alertsList__item"
          v-for="alert in alerts"
          :key="alert.id"
        >
          <alert-message
            :userAvatar="alert.userAvatar"
            :altAvatar="alert.userName + ' icon'"
            :userName="alert.userName"
            :referenceDate="referenceDate"
            :startDate="alert.startDate"
            :endDate="alert.endDate"
            :alertTitle="alert.alertTitle"
            :alertText="alert.alertText"
            :phoneButton="$t('lang.components.alerts.phoneButton')"
            :linkButton="$t('lang.components.alerts.linkButton')"
            @phoneButtonEvent="toPhone(alert.alertPhone)"
            @linkButtonEvent="toLink(alert.alertLink)"
          ></alert-message>
        </v-ons-list-item>
      </v-ons-list>

      <!-- Editor de alertas -- Se puede cambiar a una página independiente -->
      <v-ons-modal
        :options="{animation:'lift'}"
        :visible.sync="isModalVisible"
        class="alertModal"
        name="alertModal"
      >
        <alert-script
          :userAvatar="userAvatar"
          :altAvatar="userAvatar + ' icon'"
          :userName="userName"
          :isVerified="isVerified"
          ref="alertScript"
        ></alert-script>
        <v-ons-button @click.prevent="cancel">Cancel</v-ons-button>
        <v-ons-button @click.prevent="createAlert">Ok</v-ons-button>
      </v-ons-modal>

      <!-- Botones para probrar funcionalidades -- Se pueden eliminar -->
      <div class="buttonsGroup">
        <v-ons-button
          class="logOutButton__button"
          name="logOutButton"
          :disabled="false"
          ripple="true"
          @click.prevent="logOutUser"
        >Logout User</v-ons-button>

        <v-ons-button
          class="deleteButton__button"
          name="deleteButton"
          :disabled="false"
          ripple="true"
          @click.prevent="deleteUser"
        >Delete User</v-ons-button>

        <v-ons-button
          class="toJSON__button"
          name="toJSONButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toJSON"
        >User JSON</v-ons-button>
      </div>
    </div>
    <v-ons-fab position="bottom right" ripple="true" @click.prevent="isModalVisible = true">
      <v-ons-icon class="alertScript__icon" icon="ion-edit, material:zmdi-email-open"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import alertMessage from '@components/Alerts/alertMessage'
import alertScript from '@components/Alerts/alertScript'
export default {
  name: 'alerts',
  components: {
    alertMessage,
    alertScript
  },
  timers: {
    loadDate: {
      time: 1000,
      autostart: false,
      repeat: false
    }
  },
  data() {
    return {
      alerts_old: {
        RealMadrid: {
          userAvatar: 'src/assets/Real-Madrid-logo-256.png',
          userName: 'Real Madrid',
          endDate: 2563698,
          alertTitle: 'Asientos partido Real Madrid-Barcelona',
          alertText:
            'Todavía quedan algunos asientos libres para el Clásico de esta tarde',
          alertPhone: '',
          alertLink: 'https://www.realmadrid.com/entradas'
        },
        AtleticoMadrid: {
          userAvatar: 'src/assets/Atletico-Madrid-logo-256.png',
          userName: 'Atlético de Madrid',
          endDate: 4589752,
          alertTitle: 'Palco VIP partido Atlético-Celta',
          alertText:
            'Tenemos un palco Vip en el primer anfiteatro para el partido de esta noche. 1.000€',
          alertPhone: '',
          alertLink: 'https://www.atleticodemadrid.com/entradas'
        }
      },
      isModalVisible: false,
      // userAvatar: '@assets/Real-Madrid-logo-256.png',
      // userName: null,
      referenceDate: ''
      // numAlerts: null
    }
  },
  mounted() {
    console.log('montado Alerts.vue')
    this.numAlerts = document.getElementsByClassName('alertsList__item').length
    console.log('El número de alertas es: ' + this.numAlerts)
  },
  computed: {
    ...mapState('user', {
      userName: state => state.user.name,
      isVerified: state => state.user.isVerified,
      userAvatar: state => state.user.avatar
    }),
    ...mapGetters('alerts', {
      alerts: 'LOADED_ALERTS',
      numAlerts: 'NUM_ALERTS'
    })
  },
  methods: {
    ...mapActions('user', ['LOGOUT_USER', 'DELETE_USER', 'TO_JSON']), //solo en producción luego borrar
    ...mapMutations('alerts', [' SET_NUM_ALERTS']),

    toPhone(phone) {
      console.log('phone to: ' + phone)
    },
    toLink(link) {
      console.log('link to: ' + link)
      window.location.href = link
    },
    cancel() {
      this.isModalVisible = false
      this.toHomePage()
    },
    createAlert() {
      this.isAlertVisible = false
      this.$refs.alertScript.onCreateAlert()
      this.toHomePage()
    },
    // Establece la fecha de referencia según la configuración del timer
    loadDate() {
      // Si no hay alertas o todas están caducadas parar el timer o no arrancar
      this.referenceDate = Date.now()
      console.log('La fecha de referencia es:' + this.referenceDate)
    },
    toHomePage() {
      const options = {
        animation: 'slide'
      }
      let myModal = document.querySelector('.alertModal')
      myModal.addEventListener('prehide', event => {
        console.log('Se cierra el modal')
      })
      // this.$VOnsModal('preHide', event => {
      //   console.log('Se cierra el modal')
      // })
    },
    logOutUser() {
      this.LOGOUT_USER()
    },
    deleteUser() {
      this.DELETE_USER()
    },
    toJSON() {
      this.TO_JSON()
    }
  }
}
</script>

<style scoped>
.toolbar__center {
  color: white;
}
.dummyText {
  margin-left: 16px;
  margin-right: 16px;
}
.alertsList {
  width: 96%;
  margin-left: 2%;
}
.alertsList__item {
}
.fab {
  background-color: #e06257;
}
.modal {
  background: white;
}
.alertScript__icon {
  color: white;
}
.logOutButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
.toJSONButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
.buttonsGroup {
  margin-left: 16px;
  margin-right: 16px;
}
.button {
  margin-top: 8px;
  width: 100%;
  background-color: red;
  border-radius: 18px;
}
</style>
