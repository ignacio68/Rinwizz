<template>
  <v-ons-card class="alertMessage">
    <!----------- FECHA DE EMISIÓN DE LA ALERTA Y CUENTAATRAS ----------->
    <v-ons-row vertical-align="top" class="dateCountdown">
      <p class="alertMessage__date">{{ shortDate }}</p>
      <countdown
        class="alertMessage__countDown"
        :reference-date="referenceDate"
        :end-date="endDateAlert"
        :start-date="startDate"
      />
    </v-ons-row>

    <!----------- ICONO Y NOMBRE DEL EMISOR Y TITULO DE LA ALERTA ----------->
    <v-ons-row vertical-align="top" class="iconNameTitle">
      <v-ons-col vertical-align="bottom" width="20%" class="leftCol">
        <img
          :src="userAvatar"
          :alt="altAvatar"
          class="alertMessage__userAvatar"
          @click.prevent="onAvatarClick()"
        />
      </v-ons-col>

      <v-ons-col vertical-align="bottom" width="80%" class="rigthCol">
        <v-ons-row>
          <h3 class="alertMessage__userName">{{ userName }}</h3>
        </v-ons-row>
        <v-ons-row>
          <h2 class="alertMessage__title">{{ alertTitle }}</h2>
        </v-ons-row>
      </v-ons-col>
    </v-ons-row>

    <!----------- TEXTO E IMAGENES DE LA ALERTA Y BOTONES ----------->
    <v-ons-row class="textImagesButtons">
      <v-ons-row>
        <p class="alertMessage__text">{{ alertText }}</p>
      </v-ons-row>
      <v-ons-row>
        <img src="#" class="alertMessage__textImage" />
      </v-ons-row>
      <v-ons-row>
        <div class="alertMessage-buttons">
          <v-ons-button
            class="alertMessage__button"
            ripple="true"
            @click.prevent="onPhoneClick()"
          >
            {{ phoneButton }}
          </v-ons-button>
          <v-ons-button
            class="alertMessage__button"
            ripple="true"
            @click.prevent="onLinkClick()"
          >
            {{ linkButton }}
          </v-ons-button>
          <v-ons-button class="alertMessage__button" ripple="true">
            <v-ons-icon icon="ion-share, material:md-share" />
          </v-ons-button>
        </div>
      </v-ons-row>
    </v-ons-row>
  </v-ons-card>
</template>

<script>
/**
 * Alerta
 */
import countdown from './countdown'
export default {
  name: 'AlertMessage',
  components: {
    countdown
  },
  props: {
    /**
     * Nombre de usuario
     */
    userName: {
      type: String,
      default: ''
    },
    /**
     * Icono del emisor
     */
    userAvatar: {
      type: String,
      default: ''
    },
    altAvatar: {
      type: String,
      default: ''
    },
    /**
     * Fecha del comienzo de la alerta
     */
    startDate: {
      type: [Number, String],
      default: null
    },
    /**
     * Fecha del fin de la alerta
     */
    endDate: {
      type: [Number, String],
      default: null
    },
    /**
     * Fecha actual
     */
    referenceDate: {
      type: [Number, String],
      default: null
    },
    /**
     * Título de la alerta
     */
    alertTitle: {
      type: String,
      default: ''
    },
    /**
     * Texto de la alerta
     */
    alertText: {
      type: String,
      default: ''
    },
    phoneButton: {
      type: String,
      default: ''
    },
    linkButton: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    entities: {
      type: Object,
      default: null
    },
    extendedEntities: {
      type: Object,
      default: null
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    // Establece la fecha de emisión de la alerta
    shortDate() {
      const shortDateFormat = new Date(this.startDate).toDateString()
      return shortDateFormat
    },
    // Convierte la fecha de término de la alarma a un entero
    endDateAlert() {
      const intEndDate = parseInt(this.endDate, 10)
      // console.log('Estoy en endDateAlert y intEndDate es: ' + intEndDate)
      return intEndDate
    }
  },
  methods: {
    /**
     * Llamar por telefono
     *
     * @event onPhoneClick
     * @public
     */

    onPhoneClick() {
      this.$emit('phonetButtonEvent')
    },

    /**
     * Acceder al enlace
     *
     * @event onLinkClick
     * @public
     */

    onLinkClick() {
      this.$emit('linkButtonEvent')
    },

    /**
     * Lanza la configuración del emisor de la alerta
     *
     * @event onAvatarClick
     * @public
     */

    onAvatarClick() {
      this.$emit('avatarEvent')
    }
  }
}
</script>

<style scoped>
.leftCol {
  border: 2px solid darkslategrey;
}
.rigthCol {
  height: 50px;
  padding-left: 16px;
  border: 2px solid darkred;
  text-align: center;
}
.rigthColText {
  margin-left: 20%;
}
.alertMessage {
  border: 2px solid red;
}
.alertMessage__emissionAlert {
  border: 1px solid pink;
}
.alertMessage__countDown {
  text-align: right;
  font-size: 1em;
  color: rgba(15, 2, 2, 0.884);
  border: 1px solid blue;
}
.alertMessage__userAvatar {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 1px solid orange;
}
.alertMessage__userName {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, 0.788);
  border: 1px solid green;
}
.alertMessage__title {
  text-align: left;
  font-size: 14px;
  margin-top: 16px;
  font-weight: bold;
  border: 1px solid rgb(113, 0, 128);
}
.alertMessage-buttons {
  float: right;
  right: 0px;
  border: 1px solid green;
}
.alertMessage__button {
  margin-left: 5px;
}
</style>
