<template>
  <v-ons-page id="gender">
    <div class="content">
      <p>{{ $t('lang.views.gender.main') }}</p>
      <v-ons-list>
        <v-ons-list-item
          v-for="(gender, $index) in genders"
          :key="gender"
          tappable
        >
          <label class="left">
            <v-ons-radio
              v-model="selectedGender"
              :input-id="'radio-' + $index"
              :value="gender"
            />
          </label>
          <label :for="'radio-' + $index" class="center">{{ gender }}</label>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">mi género es: {{ selectedGender }}!</div>
        </v-ons-list-item>
      </v-ons-list>
      <br />
      <v-ons-row class="buttons">
        <v-ons-button
          class="skip__button"
          name="skipButton"
          :disabled="false"
          ripple="true"
          @click.prevent="toAvatar"
        >
          {{ $t('lang.buttons.skip') }}
        </v-ons-button>
        <v-ons-button
          class="confirm__button"
          name="confirmButton"
          :disabled="false"
          ripple="true"
          @click.prevent="updateGender"
        >
          {{ $t('lang.views.gender.button') }}
        </v-ons-button>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>
<script>
import { mapMutations } from 'vuex'
import Avatar from './Avatar'
export default {
  name: 'Gender',
  namespace: true,
  data() {
    return {
      // TODO: INTERNACIONALIZAR!!
      genders: ['Hombre', 'Mujer', 'Otro'],
      selectedGender: ''
    }
  },
  computed: {
    /*
    // TODO: INTERNACIONALIZAR!!
    genders() {
      return this.$tc('lang.views.gender.genders')
    }, */
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapMutations('user', ['UPDATE_USER']),
    updateGender() {
      const userData = { personal: { age: '', gender: '' } }
      userData.personal.gender = this.selectedGender
      this.UPDATE_USER(userData)
      this.toHobbies()
    },
    toAvatar() {
      this.PUSH(Avatar)
    }
  }
}
</script>
<style scoped>
.container {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 24px;
}
</style>
