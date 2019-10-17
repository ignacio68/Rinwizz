<template>
  <div>
    <div>
      <h1>FAKE PAGE!!</h1>
      <br />
      <p>user is: {{ user.name }}</p>
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
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'fake',
  beforeCreate() {
    console.log('Fake beforeCreated()')
    this.LOAD_ALERTS()
  },
  created() {
    console.log('Fake created()')
    this.AUTO_SIGN_IN()
  },
  beforeMount() {
    console.log('Fake beforeMount()')
  },
  mounted() {
    console.log('Fake mounted()')
  },
  computed: {
    ...mapGetters('user', { user: 'USER' }),
    ...mapGetters('alerts', { alerts: 'GET_ALERTS' })
  },
  methods: {
    ...mapActions('user', ['AUTO_SIGN_IN']),
    ...mapActions('alerts', ['LOAD_ALERTS'])
  }
}
</script>
