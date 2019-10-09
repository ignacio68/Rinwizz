<template>
  <v-ons-page id="alerts">
    <the-custom-toolbar
      class="customToolbar"
      :pageTitle="$t('lang.pages.alerts.toolbar')"
    ></the-custom-toolbar>

    <div class="content">
      <v-ons-pull-hook
        :action="onUpdatedAlerts"
        id="pullHook"
      >
        <!-- Las siguientes líneas son de prueba -- Se pueden elminar  -->
        <h5 class="dummyText">Hola {{ userName }} estas son tus alertas</h5>
        <h5 class="dummyText">
          Este es tu Avatar
          <span>
            <img
              class="alertCard__userAvatar"
              src="src/assets/Real-Madrid-logo-256.png"
            />
          </span>
        </h5>
        <h5
          v-if="isVerified"
          class="dummyText"
        >Estás verificado</h5>

        <!-- Alerts list -- Se oculta si no hay alertas disponibles -->
        <v-ons-list
          v-if="alerts"
          class="alertsList"
        >
          <v-ons-list-item
            :modifier="md ? 'nodivider' : ''"
            class="alertsList__item"
            v-for="alert in alerts"
            :key="alert.id"
          >
            <alert-message
              :userName="alert.user.name"
              :userAvatar="alert.user.avatar"
              :altAvatar="alert.userName + ' icon'"
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
          :userAvatar="userAvatar"
          :altAvatar="userAvatar + ' icon'"
          :userName="userName"
          :isVerified="isVerified"
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { createDb, fetchAllDocs } from '@services/database'
import { optionsFetchBatchDocsSample } from '@utils/database'
import alertMessage from '@components/Alerts/alertMessage'
import alertScript from '@components/Alerts/alertScript'

document.addEventListener(
  'init',
  event => {
    if (event.target.matches('#alerts')) {
      console.log('alerts is initiated.')
    }
  },
  false
)

document.addEventListener(
  'show',
  event => {
    if (event.target.matches('#alerts')) {
      console.log('alerts is show.')
    }
  },
  false
)

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
      // user: {},
      alerts: {},
      isModalVisible: false,
      // userAvatar: '@assets/Real-Madrid-logo-256.png',
      // userName: null,
      referenceDate: '',
      numAlerts: 0
    }
  },
  async created() {
    console.log('Alerts.vue created()')
    // Load the alerts database    const usersDb = createDb('users')
    // const alertsDb = createDb('alerts')
    // if (alertsDb) {
    //   // Establecemos la configuración -- Recuperarla como parametro
    //   const options = JSON.parse(JSON.stringify(optionsFetchBatchDocsSample))
    //   // límite de alertas a recuperar -- PRUEBA
    //   options.limits = 10
    //   await fetchAllDocs(alertsDb, this.user.uid)
    //     .then(allAlerts => {
    //       this.alerts = allAlerts
    //       this.SET_ALERTS_LOCAL_DB(alerts)
    //     })
    //     .catch(error => {
    //       console.log('fetchAllDocs error: ' + error)
    //     })
    // } else {
    //   console.log('No hay base de datos de alertas')
    // }
    this.CREATE_ALERTS_LOCAL_DB()
    this.alerts = await this.GET_ALERTS()
  },
  beforeMount() {
    console.log('Alerts.vue beforeMount()')
  },
  mounted() {
    console.log('Alerts.vue mounted()')
    this.numAlerts = document.getElementsByClassName('alertsList__item').length
    console.log('El número de alertas es: ' + this.numAlerts)
    console.log('El nombre del usuario es: ' + this.user.name)
    console.log('El email del usuario es: ' + this.user.email)
  },
  computed: {
    ...mapGetters('alertsLocalDb', { updatedAlerts: 'ALERTS_LOCAL_DB' }),
    // ...mapGetters('user', { user: 'USER' }),
    userName() {
      return this.user.name
    },
    isVerified() {
      return this.user.isVerified
    },
    userAvatar() {
      return this.user.avatar
    }
  },
  methods: {
    // ...mapMutations('alertsLocalDb', ['SET_ALERTS_LOCAL_DB']),
    ...mapActions('alertsLocalDb', ['CREATE_ALERTS_LOCAL_DB', 'GET_ALERTS']),

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
    async createAlert() {
      this.isModalVisible = false
      this.$refs.alertScript.onCreateAlert()
      this.alerts = await this.GET_ALERTS()
      // this.toHomePage()
    },
    onUpdatedAlerts() {
      this.alerts = this.updatedAlerts
    },
    // Establece la fecha de referencia según la configuración del timer
    loadDate() {
      // Si no hay alertas o todas están caducadas parar el timer o no arrancar
      this.referenceDate = Date.now()
      console.log('La fecha de referencia es:' + this.referenceDate)
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
#id {
  background-color: cornflowerblue;
}
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
</style>
