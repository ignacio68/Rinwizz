<template>
  <div class="countdown">
    <v-ons-row>
      <v-ons-col v-if="days > 0" class="countdown__day">
        <p class="number">{{ days }}</p>
        <!--div class="format">{{ wordString.day }}</div-->
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
      <div v-if="finish" class="finish">
        <!-- TODO: INTERNACIONALIZAR -->
        <h3>FINALIZADA</h3>
      </div>
    </v-ons-row>
    <div class="countdown__status" :class="statusType">{{ statusText }}</div>
  </div>
</template>
<script>
export default {
  name: 'countdown',
  props: {
    referenceDate: [Number, String],
    startDate: [Number, String],
    endDate: [Number, String],
    trans: {}
  },
  timers: {
    timerCount: {
      time: 1000,
      autostart: true,
      repeat: true
    }
  },
  data() {
    return {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      statusText: '',
      statusType: '',
      wordString: {},
      startTimer: '',
      interval: '',
      finish: false
    }
  },
  created() {
    console.log('countdown.vue created()')
  },
  methods: {
    timerCount() {
      const endTimer = this.startDate + this.endDate
      // console.log('timerCount.startDate es: ' + this.startDate)
      // console.log('timerCount.endDate es: ' + this.endDate)
      // console.log('timerCount.endTimer es: ' + endTimer)
      // console.log('timerCount.referenceDate es: ' + this.referenceDate)
      let timeRemaining = Math.floor((endTimer - this.referenceDate) / 1000)
      // console.log('timeRemaining es: ' + timeRemaining)
      if (timeRemaining >= 0) {
        // NOTA: repasar, el término del cálculo debe de ser en 1
        this.calcTime(timeRemaining)
      } else {
        // cambiar el style del mensaje y terminar el cálculo
        console.log('methods: eliminado el intervalo')
        this.$timer.stop('timerCount')
        this.finish = true
      }
    },
    calcTime(dist) {
      this.days = Math.floor(dist / 86400)
      this.hours = Math.floor(dist / 3600)
      this.minutes = Math.floor(dist / 60)
      this.seconds = Math.floor(dist)
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
