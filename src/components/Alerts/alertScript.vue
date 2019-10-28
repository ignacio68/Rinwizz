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
            <label for="endDate" class="alertList__item-label">{{
              $t('lang.components.alertScript.end')
            }}</label>
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
import { mapActions } from 'vuex'
import { timeOptions, alertScriptProps } from '@utils/alerts'

export default {
  name: 'alert-script',
  props: alertScriptProps,
  data() {
    return {
      alertData: {},
      alertTitle: '',
      alertText: '',
      alertEndDate: 0,
      alertLink: '',
      altAvatar: this.userName + ' icon',
      options: timeOptions
    }
  },
  created() {
    console.log('alertScript.vue created()')
  },
  computed: {
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

      // Almacenamos los datos de la alerta
      // let parseEndDate = endDate.getTime()
      // this.finalDate = this.startDate + this.endDate

      const alertData = {
        title: this.alertTitle,
        text: this.alertText,
        endDate: this.alertEndDate,
        link: this.alertLink,
        user: {
          _id: this.userId,
          name: this.userName,
          screenName: this.userScreenName,
          avatar: this.userAvatar,
          location: this.userLocation,
          url: this.userUrl,
          description: this.userDescription,
          verified: this.isVerified
        },
        phone: this.alertPhone,
        location: '',
        entities: {},
        extendedEntities: {},
        favoriteCount: 0
      }

      console.log('alertScript alerta es: ' + JSON.stringify(alertData))
      // Llamamos a la ación para escibir la alerta
      this.CREATE_ALERT(alertData)

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
