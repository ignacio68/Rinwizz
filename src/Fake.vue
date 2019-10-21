<template>
  <div>
    <div>
      <h1>FAKE PAGE!!</h1>
      <br />
      <p>user is: {{ fakeUser.name }}</p>
    </div>
    <div id="alerts">
      <v-ons-list-item
        :modifier="md ? 'nodivider' : ''"
        class="alertsList__item"
        v-for="alert in fakeAlerts"
        :key="alert._id"
      >
        <p>alerta_id: {{ alert._id }}</p>
      </v-ons-list-item>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'fake',
  data() {
    return {
      fakeUser: {
        name: 'pepito'
      }
      // fakeAlerts: {}
    }
  },
  beforeCreate() {
    console.log('Fake beforeCreated()')
  },
  async created() {
    console.log('Fake created()')
    await this.CREATE_ALERTS_LOCAL_DB()
    await this.LOAD_ALERTS()
    //  this.AUTO_SIGN_IN()
  },
  computed: {
    // ...mapGetters('user', { fakeUser: 'USER' }),
    ...mapGetters('alerts', { fakeAlerts: 'GET_ALERTS' })
  },
  methods: {
    // ...mapActions('user', ['AUTO_SIGN_IN']),
    ...mapActions('alertsLocalDb', ['CREATE_ALERTS_LOCAL_DB']),
    ...mapActions('alerts', ['LOAD_ALERTS'])
  }
}
</script>
