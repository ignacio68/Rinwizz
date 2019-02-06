<template>
<div>
  <!--v-ons-card class="alertCard"-->
    <div class="title">
    
    </div>

    <div class="content">
      <v-ons-row>
        <p class="alertCard__emissionAlert">{{ shortDate }}</p>
      </v-ons-row>
      <v-ons-row>
          <!-- h4 class="alertCard__countDown">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h4 -->
          <countdown class="alertCard__countDown"
            :referenceDate="referenceDate"
            :endDate="alertEndDate"
            :startDate="startDate"
            :trans="leyendas"
          ></countdown>
      </v-ons-row>

      <v-ons-row>
        <v-ons-col width="21%">
          <img
            :src="userIcon"
            :alt="altIcon"
            class="alertCard__userIcon"
          >
        </v-ons-col>
        <v-ons-col>
          <h3 class="alertCard__userName">{{ userName }}</h3>
        </v-ons-col>
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
          >
            {{ phoneButton }}
          </v-ons-button>
          <v-ons-button 
            class="alertCard__button"
            ripple="true"
            @click.prevent="onLinkClick()"
          >
            {{ linkButton }}
          </v-ons-button>
          <v-ons-button
            class="alertCard__button" 
            ripple="true"
          >
            <v-ons-icon icon="ion-share, material:md-share"/>
          </v-ons-button>
        </div>
      </v-ons-row>
      
    </div>
</div>
  <!-- /v-ons-card -->
</template>

<script>
  import countdown from './countdown'
  export default {
    name: 'alert-message',
    components: {
      countdown
    },
    props: {
      userIcon: {
        type: String,
        default: ''
      },
      altIcon: {
        type: String,
        default: ''
      },
      userName: {
        type: String,
        default: ''
      },
      referenceDate: [
        Number,
        String
        ],
      startDate: [
        Number,
        String
      ],
      endDate: [
        Number,
        String
      ],
      alertTitle: {
        type: String,
        default: ''
      },
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
      }
    },
    data () {
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
    mounted () {
      console.log('montado alertMessage.vue')
    },
    computed: {
      // Establece la fecha de emisión de la alerta
      shortDate () {
        const shortDateFormat = new Date(this.startDate).toDateString()
        return shortDateFormat
      },
      // Convierte la fecha de término de la alarma a un entero
      alertEndDate () {
        const intEndDate = parseInt(this.endDate, 10)
        console.log('Estoy en alertEndDate y intEndDate es: ' + intEndDate)
        return intEndDate
      }
    },
    methods: {
      onPhoneClick () {
        this.$emit('phonetButtonEvent')
      },
      onLinkClick () {
        this.$emit('linkButtonEvent')
      }
    }
  }
</script>

<style scoped>
  .alertCard {
    border: 1px solid red;
  }
  .alertCard__emissionAlert {
    border: 1px solid pink
  }
  .alertCard__countDown {
    text-align: right;
    font-size: 1em;
    color: red;
    border: 1px solid blue;
  }
  .alertCard__userIcon {
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
  .alertCard__button{
    margin-left: 5px;
  }
</style>
