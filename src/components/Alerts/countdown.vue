<template>
  <div class="countdown">
    <v-ons-row>
      <div v-if="days > 0" class="countdown__day">
        <span class="number">{{ days }}</span>
        <!--div class="format">{{ wordString.day }}</div-->
        <div>Dias</div>
      </div>
      <div v-if="hours > 0" class="countdown__hour">
        <span class="number">{{ hours }}</span>
        <!--div class="format">{{ wordString.hours }}</div-->
        <div>Horas</div>
      </div>
      <div v-if="minutes > 0" class="countdown__min">
        <span class="number">{{ minutes }}</span>
        <!--div class="format">{{ wordString.minutes }}</div-->
        <div>Minutos</div>
      </div>
      <div v-if="seconds > 0" class="countdown__sec">
        <span class="number">{{ seconds }}</span>
        <!--div class="format">{{ wordString.seconds }}</div-->
        <div>Seg</div>
      </div>
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
<style scoped></style>
