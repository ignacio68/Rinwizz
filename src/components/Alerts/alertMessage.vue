<template>
  <div>
    <!--v-ons-card class="alertCard"-->
    <div class="title"></div>

    <div class="content">
      <v-ons-row>
        <p class="alertCard__emissionAlert">{{ shortDate }}</p>
        <!-- h4 class="alertCard__countDown">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h4 -->
        <countdown
          class="alertCard__countDown"
          :referenceDate="referenceDate"
          :endDate="alertEndDate"
          :startDate="startDate"
          :trans="leyendas"
        ></countdown>
      </v-ons-row>

      <v-ons-col
        width="20%"
        class="leftCol"
      >
        <img
          :src="userAvatar"
          :alt="altAvatar"
          class="alertCard__userAvatar"
        />
      </v-ons-col>

      <v-ons-col class="rigthCol">
        <div></div>
        <v-ons-row>
          <h3 class="alertCard__userName">{{ userName }}</h3>
        </v-ons-row>

        <v-ons-row>
          <h2 class="alertCard__title">{{ alertTitle }}</h2>
        </v-ons-row>

        <v-ons-row>
          <p class="alertCard__text">{{ alertText }}</p>
        </v-ons-row>

        <v-ons-row>
          <div class="alertCard-buttons">
            <v-ons-button
              class="alertCard__button"
              ripple="true"
              @click.prevent="onPhoneClick()"
            >{{ phoneButton }}</v-ons-button>
            <v-ons-button
              class="alertCard__button"
              ripple="true"
              @click.prevent="onLinkClick()"
            >{{ linkButton }}</v-ons-button>
            <v-ons-button
              class="alertCard__button"
              ripple="true"
            >
              <v-ons-icon icon="ion-share, material:md-share" />
            </v-ons-button>
          </div>
        </v-ons-row>
      </v-ons-col>
    </div>
  </div>
  <!-- /v-ons-card -->
</template>

<script>
/**
 * Alerta
 */
import countdown from './countdown'
export default {
  name: 'alert-message',
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
    referenceDate: [Number, String],
    /**
     * Fecha del comienzo de la alerta
     */
    startDate: [Number, String],
    /**
     * Fecha del fin de la alerta
     */
    endDate: [Number, String],
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
      default: {}
    },
    extendedEntities: {
      type: Object,
      default: {}
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      interval: '',
      leyendas: {
        day: 'D',
        hours: 'H',
        minutes: 'M',
        seconds: 'S'
      }
    }
  },
  created() {
    console.log('alertMessage.vue created()')
  },
  computed: {
    // Establece la fecha de emisión de la alerta
    shortDate() {
      const shortDateFormat = new Date(this.startDate).toDateString()
      return shortDateFormat
    },
    // Convierte la fecha de término de la alarma a un entero
    alertEndDate() {
      const intEndDate = parseInt(this.endDate, 10)
      console.log('Estoy en alertEndDate y intEndDate es: ' + intEndDate)
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
    }
  }
}
</script>

<style scoped>
.leftCol {
  border: 2px solid darkslategrey;
}
.rigthCol {
  margin: 5px;
  border: 2px solid darkred;
}
.alertCard {
  border: 2px solid red;
}
.alertCard__emissionAlert {
  border: 1px solid pink;
}
.alertCard__countDown {
  text-align: right;
  font-size: 1em;
  color: red;
  border: 1px solid blue;
}
.alertCard__userAvatar {
  height: 50px;
  width: 50px;
  border: 1px solid orange;
}
.alertCard__userName {
  padding-left: 5px;
  text-align: left;
  font-weight: bold;
  color: black;
  border: 1px solid lime;
}
.alertCard-buttons {
  float: right;
  right: 0px;
  border: 1px solid green;
}
.alertCard__button {
  margin-left: 5px;
}
</style>
