<template>
  <v-ons-page id="gender">
    <div class="content">
      <p>{{ $t('lang.pages.gender.main') }}</p>
      <v-ons-list>
        <v-ons-list-item
          v-for="(gender, $index) in genders"
          :key="gender"
          tappable
        >
          <label class="left">
            <v-ons-radio
              :input-id="'radio-' + $index"
              :value="gender"
              v-model="selectedGender"
            ></v-ons-radio>
          </label>
          <label :for="'radio-' + $index" class="center">{{ gender }}</label>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">mi género es: {{ selectedGender }}!</div>
        </v-ons-list-item>
      </v-ons-list>
      <br />
      <div class="userLocationButton">
        <v-ons-button
          class="userLocationButton__button"
          name="userLocationButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="updateGender"
          >{{ $t('lang.pages.gender.button') }}</v-ons-button
        >
      </div>
    </div>
  </v-ons-page>
</template>
<script>
import { mapMutations } from 'vuex'
import Hobbies from './Hobbies'
export default {
  name: 'gender',
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
      return this.$tc('lang.pages.gender.genders')
    }, */
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapMutations('user', ['UPDATE_USER']),
    async updateGender() {
      const data = { personal: { age: '', gender: '' } }
      data.personal.gender = this.selectedGender
      await this.UPDATE_USER(data)
      await this.toHobbies()
    },
    async toHobbies() {
      await this.PUSH(Hobbies)
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
