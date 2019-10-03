<template>
  <v-ons-card class="alertCard">
    <div class="content">
      <v-ons-row class="row">
        <img class="alertCard__userAvatar" :src="userAvatar" :alt="altAvatar" />
        <h3 class="alertCard_userName">{{ userName }}</h3>
        <v-ons-icon
          v-if="isVerified"
          class="alertCard_verifiedIcon"
          size="16px"
          icon="ion-checkmark-circle, material:zmdi-check-circle-u"
        />
      </v-ons-row>

      <v-ons-col class="columnRight">
        <v-ons-list class="alertList">
          <v-ons-list-item class="alertList__item">
            <!--label for="alertTitle" class="alertList__item-label">{{ $t('lang.components.alertScript.title')}}</label-->
            <input
              class="alertList__item-title"
              name="alertTitle"
              type="text"
              id="alertTitle"
              :placeholder="$t('lang.components.alertScript.title')"
              v-model="alertTitle"
            />
          </v-ons-list-item>
          <v-ons-list-item class="alertList__item">
            <!--label for="alertName" class="alertList__item-label">{{ $t('lang.components.alertScript.text') }}</label-->
            <textarea
              class="alertList__item-text"
              name="alertName"
              type="text"
              id="alertText"
              v-model="alertText"
              rows="3"
              maxlength="128"
              :placeholder="$t('lang.components.alertScript.text')"
              required
            ></textarea>
          </v-ons-list-item>
          <v-ons-list-item class="alertList__item">
            <label for="endDate" class="alertList__item-label">
              {{ $t('lang.components.alertScript.end') }}
            </label>
            <v-ons-select
              class="alertList__item-endDate"
              name="endDate"
              v-model="alertEndDate"
              required
            >
              <option
                v-for="option in options"
                :value="option.value"
                :key="option.id"
                >{{ option.text }}</option
              >
            </v-ons-select>
          </v-ons-list-item>
          <v-ons-list-item class="alertList__item">
            <!--label for="alertLink" class="alertList__item-label">{{ $t('lang.components.alertScript.link') }}</label-->
            <input
              class="alertList__item-link"
              name="alertLink"
              type="url"
              id="alertLink"
              :placeholder="$t('lang.components.alertScript.link')"
              v-model="alertLink"
            />
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-col>
    </div>
  </v-ons-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'alert-script',
  props: {
    userAvatar: {
      type: String,
      required: true,
      default: ''
    },
    altAvatar: {
      type: String,
      required: true,
      default: ''
    },
    userName: {
      type: String,
      required: true,
      default: ''
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    alertPhone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      alertTitle: '',
      alertText: '',
      alertEndDate: 0,
      alertLink: '',
      options: [
        { text: '10 segundos', value: 10000 },
        { text: '1 minuto', value: 60000 },
        { text: '5 minutos', value: 300000 },
        { text: '15 minutos', value: 900000 },
        { text: '30 minutos', value: 1800000 },
        { text: '45 minutos', value: 2700000 },
        { text: '1 hora', value: 3600000 },
        { text: '2 horas', value: 7200000 },
        { text: '3 horas', value: 10800000 },
        { text: '4 horas', value: 14400000 },
        { text: '5 horas', value: 18000000 },
        { text: '6 horas', value: 21600000 }
      ]
    }
  },
  mounted() {
    console.log('montado alertScript.vue')
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    /**
     * Comprueba si el formulario es válido
     * los campos de título o texto deben de tener contenido
     */
    formIsValid() {
      return this.alertTitle !== '' || this.alertText !== ''
    },
    /**
     * Resetea los campos de la alerta
     * TODO: revisar
     */
    resetAlert(alertData) {
      alertData.alertTitle = ''
      alertData.alertText = ''
      alertData.endDate = 0
      alertData.alertLink = ''

      return alertData
    }
  },
  methods: {
    ...mapActions('alerts', ['CREATE_ALERT']),

    /**
     * Este método hay que llamarlo desde el padre
     * sirve para crear la alerta cuando se hace click en OK
     *
     */
    onCreateAlert() {
      if (!this.formIsValid) {
        return
      }

      // console.log('Estoy en onCreateAlert.startDate= ' + this.startDate)
      // Almacenamos los datos de la alerta
      // let parseEndDate = endDate.getTime()
      // this.finalDate = this.startDate + this.endDate
      const alertData = {
        title: this.alertTitle,
        text: this.alertText,
        endDate: this.alertEndDate,
        link: this.alertLink
      }
      console.log(alertData)
      // Escribimos la alerta en la base de datos de Firebase
      this.CREATE_ALERT(this.user, alertData)
      // this.$router.push('/meetups')
      this.$emit('onCreateAlert')
      // ¡¡¡¡DA ERROR!!!!
      // Reseteamos los campos de la alerta
      // return this.resetAlert(alertData)
    }
  }
}
</script>

<style scoped>
.title__text {
  font-size: 20px;
  color: black;
}
.columnRight {
  border: 1px solid black;
}
.alertCard {
  border: 1px solid red;
}
.alertCard__userAvatar {
  height: 36px;
  width: 36px;
  border: 1px solid blue;
}
.alertCard__userName {
  padding-left: 5px;
  text-align: left;
  font-weight: bold;
  color: black;
  border: 1px solid green;
}
.alertCard_verifiedIcon {
  color: blue;
}
.alertList__item-endDate {
  font-size: 8px;
}
</style>
