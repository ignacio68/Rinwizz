<template>
  <v-ons-page id="alerts">
    <the-custom-toolbar
      id="customToolbar"
      :page-title="$t('lang.views.alerts.toolbar')"
    />

    <div class="content">
      <v-ons-pull-hook id="pullHook" :action="onUpdatedAlerts">
        <!-- Las siguientes líneas son de prueba -- Se pueden elminar  -->
        <div id="dummy">
          <h5 class="dummyText">Hola {{ user.name }} estas son tus alertas</h5>
          <h5 class="dummyText">
            Este es tu Avatar
            <span>
              <img
class="alertCard__userAvatar" :src="user.avatar" />
            </span>
          </h5>
          <h5 v-if="!isVerified"
class="dummyText">
            No estás verificado
          </h5>
        </div>

        <!-- Alerts list -- Se oculta si no hay alertas disponibles -->
        <v-ons-list v-if="alerts"
class="alertsList">
          <v-ons-list-item
            v-for="alert in alerts"
            :key="alert._id"
            :modifier="md ? 'nodivider' : ''"
            class="alertsList__item"
          >
            <alert-message
              :user-name="alert.user.name"
              :user-avatar="alert.user.avatar"
              :alt-avatar="alert.user.name + ' icon'"
              :reference-date="referenceDate"
              :start-date="alert.creationDate"
              :end-date="alert.endDate"
              :alert-title="alert.title"
              :alert-text="alert.text"
              :phone-button="$t('lang.components.alerts.phoneButton')"
              :link-button="$t('lang.components.alerts.linkButton')"
              :location="alert.location.city"
              :entities="alert.entities"
              :extended-entities="alert.extendedEntities"
              :favorite-count="alert.favoriteCount"
              @phoneButtonEvent="toPhone(alert.phone)"
              @linkButtonEvent="toLink(alert.link)"
            />
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
          ref="alertScript"
          :user-id="user._id"
          :user-name="user.name"
          :user-screen-name="user.screenName"
          :user-avatar="user.avatar"
          :user-location="user.location"
          :user-url="user.url"
          :user-description="user.description"
          :is-verified="user.verified"
          :alert-phone="user.phone"
        />
        <v-ons-button @click.prevent="cancel">
          Cancel
        </v-ons-button>
        <v-ons-button @click.prevent="createAlert">
          Ok
        </v-ons-button>
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
      />
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import alertMessage from '@components/Alerts/alertMessage'
import alertScript from '@components/Alerts/alertScript'
// import { timer } from 'vue-timers'
import VueTimers from 'vue-timers/mixin'

export default {
  name: 'Alerts',
  components: {
    alertMessage,
    alertScript
  },
  mixins: [VueTimers],
  timers: {
    loadDate: {
      time: 1000,
      autostart: true,
      repeat: true
    }
  },
  data() {
    return {
      isModalVisible: false,
      referenceDate: 0
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
    // Establece la fecha de referencia según la configuración del timer
    loadDate() {
      // TODO: Si no hay alertas o todas están caducadas parar el timer o no arrancar
      // TODO: utilizar nexTick para incrementar cada segundo
      this.referenceDate = Date.now()
    },
    async onUpdatedAlerts() {
      await this.LOAD_ALERTS()
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
