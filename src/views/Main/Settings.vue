<template>
  <v-ons-page>
    <div class="container">
      <h3>settings</h3>
      <!-- Botones para probrar funcionalidades -- Se pueden eliminar -->
      <div class="buttonsGroup">
        <v-ons-button
          class="logOutButton__button"
          name="logOutButton"
          :disabled="false"
          ripple="true"
          @click.prevent="logOutUser"
        >
          Logout User
        </v-ons-button>

        <v-ons-button
          class="deleteButton__button"
          name="deleteButton"
          :disabled="false"
          ripple="true"
          @click.prevent="deleteUser"
        >
          Delete User
        </v-ons-button>

        <v-ons-button
          class="toJSON__button"
          name="toJSONButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toJSON"
        >
          User JSON
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import LogIn from '@views/Auth/LogIn'
import Welcome from '@views/Welcome'
export default {
  name: 'Settings',
  data() {
    return {}
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),
    ...mapActions('auth', ['LOGOUT_USER', 'DELETE_USER']),
    ...mapActions('user', ['TO_JSON']),
    async logOutUser() {
      await this.LOGOUT_USER().then(() => this.REPLACE(LogIn))
    },
    async deleteUser() {
      await this.DELETE_USER().then(() => this.REPLACE(Welcome))
    },
    toJSON() {
      this.TO_JSON()
    }
  }
}
</script>

<style scoped>
.logOutButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
.toJSONButton {
  margin-top: 10px;
  margin-bottom: 10px;
}
.buttonsGroup {
  margin-left: 16px;
  margin-right: 16px;
}
.button {
  margin-top: 8px;
  width: 100%;
  background-color: red;
  border-radius: 18px;
}
</style>
