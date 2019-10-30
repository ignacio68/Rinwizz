// TODO: Comprobar si se utiliza
<template>
  <v-ons-page>
    <the-custom-toolbar :page-title="toolbarTitle" />
    <div class="container">
      <form class="configurationForm">
        <v-ons-list class="configurationForm__list">
          <v-ons-list-item class="configurationForm__list-item">
            <label
              for="textInput"
              class="left configurationForm__list-item-label"
              >nombre</label
            >
            <v-ons-input
              id="name"
              v-model="name"
              class="center configurationForm__list-input"
              type="name"
              float
              modifier="transparent"
              required
            />
          </v-ons-list-item>
          <v-ons-list-item class="configurationForm__list-item">
            <label
              for="textInput"
              class="left configurationForm__list-item-label"
              >Ubicación</label
            >
            <v-ons-input
              id="location"
              v-model="location"
              class="center configurationForm__list-input"
              type="text"
              float
              modifier="transparent"
              required
            />
          </v-ons-list-item>
        </v-ons-list>
      </form>
      <v-ons-button
        name="saveButton"
        class="save__button center"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.views.configuration.button') }}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import HomePage from '@views/Main/HomePage'

export default {
  name: 'Configuration',
  data() {
    return {
      isActive: false,
      volver: '',
      name: '',
      location: ''
    }
  },
  computed: {
    toolbarTitle() {
      return this.$t('lang.views.configuration.toolbar')
    }
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapActions('user', ['UPDATED_USER_INFO']),
    onSave() {
      const user = {}
      user.userName = this.name
      user.location = this.location
      this.UPDATED_USER_INFO(user)
      this.PUSH(HomePage)
    }
  }
}
</script>

<style scoped></style>
