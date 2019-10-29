<template>
  <div>
    <div>
      <h1>FAKE PAGE!!</h1>
      <br />
      <p>user is: {{ fakeUser.name }}</p>
    </div>
    <div id="alerts">
      <v-ons-list-item
        v-for="alert in fakeAlerts"
        :key="alert._id"
        :modifier="md ? 'nodivider' : ''"
        class="alertsList__item"
      >
        <v-ons-row>
          <h4>{{ alert.title }}</h4>
        </v-ons-row>
        <v-ons-row>
          <p>{{ alert.text }}</p>
        </v-ons-row>
      </v-ons-list-item>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Fake',
  data() {
    return {
      fakeUser: {
        name: 'pepito'
      }
      // fakeAlerts: {}
    }
  },
  computed: {
    // ...mapGetters('user', { fakeUser: 'USER' }),
    ...mapGetters('alerts', { fakeAlerts: 'GET_ALERTS' })
  },
  async created() {
    await this.CREATE_ALERTS_LOCAL_DB('alerts-fake')
    await this.LOAD_ALERTS()
    // await this.LOAD_USER()
  },
  methods: {
    // ...mapActions('user', ['LOAD_USER']),
    ...mapActions('alertsLocalDb', ['CREATE_ALERTS_LOCAL_DB']),
    ...mapActions('alerts', ['LOAD_ALERTS'])
  }
}
</script>
