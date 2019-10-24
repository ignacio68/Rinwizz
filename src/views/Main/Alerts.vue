<template>
  <v-ons-page id="alerts">
    <the-custom-toolbar
      id="customToolbar"
      :pageTitle="$t('lang.views.alerts.toolbar')"
    ></the-custom-toolbar>

    <div class="content">
      <v-ons-pull-hook
        :action="onUpdatedAlerts"
        id="pullHook"
      >
        <!-- Las siguientes líneas son de prueba -- Se pueden elminar  -->
        <div id="dummy">
          <h5 class="dummyText">Hola {{ user.name }} estas son tus alertas</h5>
          <h5 class="dummyText">
            Este es tu Avatar
            <span>
              <img
                class="alertCard__userAvatar"
                :src="user.avatar"
              />
            </span>
          </h5>
          <h5
            v-if="!isVerified"
            class="dummyText"
          >No estás verificado</h5>
        </div>

        <!-- Alerts list -- Se oculta si no hay alertas disponibles -->
        <v-ons-list
          v-if="alerts"
          class="alertsList"
        >
          <v-ons-list-item
            :modifier="md ? 'nodivider' : ''"
            class="alertsList__item"
            v-for="alert in alerts"
            :key="alert._id"
          >
            <alert-message
              :userName="alert.user.name"
              :userAvatar="alert.user.avatar"
              :altAvatar="alert.user.name + ' icon'"
              :referenceDate="referenceDate"
              :startDate="alert.creationDate"
              :endDate="alert.endDate"
              :alertTitle="alert.title"
              :alertText="alert.text"
              :phoneButton="$t('lang.components.alerts.phoneButton')"
              :linkButton="$t('lang.components.alerts.linkButton')"
              @phoneButtonEvent="toPhone(alert.phone)"
              @linkButtonEvent="toLink(alert.link)"
              :location="alert.location.city"
              :entities="alert.entities"
              :extendedEntities="alert.extendedEntities"
              :favoriteCount="alert.favoriteCount"
            ></alert-message>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-pull-hook>

      <!-- Editor de alertas -- Se puede cambiar a una página independiente -->
      <v-ons-modal
        :options="{ animation: 'lift' }"
        :visible.sync="isModalVisible"
        class="alertModal"
        name="alertModal"
      >
        <alert-script
          :userAvatar="user.avatar"
          :altAvatar="user.avatar + ' icon'"
          :userName="user.name"
          :isVerified="user.isVerified"
          :alertPhone="user.phone"
          ref="alertScript"
        ></alert-script>
        <v-ons-button @click.prevent="cancel">Cancel</v-ons-button>
        <v-ons-button @click.prevent="createAlert">Ok</v-ons-button>
      </v-ons-modal>
    </div>

    <!-- Botón para lanzar el editor de alertas -->
    <v-ons-fab
      position="bottom right"
      ripple="true"
      @click.prevent="isModalVisible = true"
    >
      <v-ons-icon
        class="alertScript__icon"
        icon="ion-edit, material:zmdi-email-open"
      ></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import alertMessage from '@components/Alerts/alertMessage'
import alertScript from '@components/Alerts/alertScript'

// document.addEventListener(
//   'init',
//   event => {
//     if (event.target.matches('#alerts')) {
//       console.log('alerts is initiated.')
//     }
//   },
//   false
// )

// document.addEventListener(
//   'show',
//   event => {
//     if (event.target.matches('#alerts')) {
//       console.log('alerts is show.')
//     }
//   },
//   false
// )

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
      isModalVisible: false,
      referenceDate: ''
    }
  },
  async created() {
    console.log('Alerts.vue created()')
    // Load the alerts
    await this.CREATE_ALERTS_LOCAL_DB('alerts')
    await this.LOAD_ALERTS()
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('alerts', { alerts: 'GET_ALERTS' }),
    isVerified() {
      return this.user.isVerified
    },
    numAlerts() {
      return this.alerts.length
    }
  },
  methods: {
    // ...mapActions('user', ['LOAD_USER']),
    ...mapActions('alertsLocalDb', ['CREATE_ALERTS_LOCAL_DB']),
    ...mapActions('alerts', ['LOAD_ALERTS']),

    toPhone(phone) {
      console.log('phone to: ' + phone)
    },
    toLink(link) {
      console.log('link to: ' + link)
      window.location.href = link
    },
    cancel() {
      this.isModalVisible = false
      // this.toHomePage()
    },
    createAlert() {
      this.isModalVisible = false
      this.$refs.alertScript.onCreateAlert()
      // this.toHomePage()
    },
    async onUpdatedAlerts() {
      await this.LOAD_ALERTS()
    },
    // Establece la fecha de referencia según la configuración del timer
    loadDate() {
      // TODO: Si no hay alertas o todas están caducadas parar el timer o no arrancar
      // TODO: utilizar nexTick para incrementar cada segundo
      this.referenceDate = Date.now()
      // console.log('La fecha de referencia es:' + this.referenceDate)
    },
    toHomePage() {
      let myModal = document.querySelector('.alertModal')
      myModal.addEventListener('prehide', event => {
        console.log('Se cierra el modal')
      })
      // this.$VOnsModal('preHide', event => {
      //   console.log('Se cierra el modal')
      // })
    }
  }
}
</script>

<style scoped>
#customToolbar {
  background-color: blueviolet;
}
.toolbar__center {
  color: white;
}
#dummy {
  border: 2px solid orangered;
}
.dummyText {
  margin-left: 16px;
  margin-right: 16px;
}
.alertCard__userAvatar {
  width: 20%;
}
.alertsList {
  width: 96%;
  margin-left: 2%;
}
.alertsList__item {
  font-size: 12px;
  background-color: lightslategray;
}
.fab {
  background-color: blue;
}
.modal {
  background: white;
}
.alertScript__icon {
  color: white;
}
</style>
