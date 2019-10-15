<template>
  <div>
    <h1>FAKE PAGE!!</h1>
    <br />
    <p>user is: {{ user.name }}</p>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'fake',
  beforeCreate() {
    console.log('Fake beforeCreated()')
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
    ...mapGetters('user', { user: 'USER' })
    // user() {
    //   return this.$store.getters('user/USER')
    // }
  },
  methods: {
    ...mapActions('user', ['AUTO_SIGN_IN'])
  }
}
</script>
