<template>
  <div class="countdown">
    <v-ons-row>
      <v-ons-col v-if="days > 0" class="countdown__day">
        <p class="number">{{ days }}</p>
        <p>D</p>
      </v-ons-col>
      <v-ons-col v-if="hours > 0" class="countdown__hour">
        <p class="number">{{ hours }}</p>
        <p>H</p>
      </v-ons-col>
      <v-ons-col v-if="minutes > 0" class="countdown__minutes">
        <p class="number">{{ minutes }}</p>
        <p>M</p>
      </v-ons-col>
      <v-ons-col v-if="seconds > 0" class="countdown__seconds">
        <p class="number">{{ seconds }}</p>
        <p>S</p>
      </v-ons-col>
    </v-ons-row>
    <!-- Decidir si hay que eliminar -->
    <!-- TODO: internacionalizar -->
    <div v-if="!status" class="countdown__status">{{ statusText }}</div>
  </div>
</template>
<script>
import VueTimers from 'vue-timers/mixin'
export default {
  name: 'countdown',
  mixins: [VueTimers],
  props: {
    referenceDate: [Number, String],
    startDate: [Number, String],
    endDate: [Number, String]
  },
  // Configuración del timer que sirve de base
  // para calcular la cuenat atras de cada alerta
  timers: {
    alertTimer: {
      time: 1000,
      autostart: true,
      repeat: true
    }
  },
  data() {
    return {
      days: void 0,
      hours: void 0,
      minutes: void 0,
      seconds: void 0,
      statusText: 'caducada',
      startTimer: void 0,
      status: true
    }
  },
  methods: {
    alertTimer() {
      let timeRemaining = Math.floor(this.endDate - this.referenceDate)
      if (timeRemaining > 0) {
        // NOTA: repasar, el término del cálculo debe de ser en 1
        this.calculateRemainingTime(timeRemaining)
      } else {
        // cambiar el style del mensaje y terminar el cálculo
        console.log('methods: eliminado el intervalo')
        this.$timer.stop('alertTimer')
        this.status = false
      }
    },
    calculateRemainingTime(distance) {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
    }
  }
}
</script>
<style scoped>
.countdown__day {
  border: 1px solid blue;
}
.number {
  border: 1px solid red;
}
</style>
