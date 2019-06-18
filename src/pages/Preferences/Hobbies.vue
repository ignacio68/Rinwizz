<template>
  <v-ons-page id="preferences">
    <div class="container">
      <p>{{ $t('lang.pages.hobbies.main') }}</p>
      <br>
      <!------ DEPORTES ------->
      <v-ons-list-title class="preferences__list-title">Deportes</v-ons-list-title>
      <v-ons-list class="sports__list">
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(sport, $index) in sports"
          :key="sport"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="sport"
              v-model="checkedSports"
            ></v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >{{ sport }}</label>
        </v-ons-list-item>
      </v-ons-list>

      <!------ OCIO ------->
      <v-ons-list-title class="preferences__list-title">Ocio</v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(entertainment, $index) in entertainments"
          :key="entertainment"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="entertainment"
              v-model="checkedEntertainments"
            ></v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >{{ entertainment }}</label>
        </v-ons-list-item>
      </v-ons-list>

      <!------ COMIDA Y BEBIDA ------->
      <v-ons-list-title class="preferences__list-title">Comida y bebida</v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(food, $index) in foods"
          :key="food"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="food"
              v-model="checkedFoods"
            ></v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >{{ food }}</label>
        </v-ons-list-item>
      </v-ons-list>

      <div class="homePageButton">
        <v-ons-button
          class="homePageButton__button"
          name="homePageButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="updateHobbies"
        >{{ $t('lang.pages.hobbies.button') }}</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import UserLocation from './UserLocation'
export default {
  name: 'hobbies',
  namespace: true,
  data() {
    return {
      sports: ['Futbol', 'Baloncesto', 'Natación sincronizada'],
      entertainments: ['cine', 'teatro', 'viajes'],
      foods: ['restaurantes', 'bares', 'discos'],
      checkedSports: [],
      checkedEntertainments: [],
      checkedFoods: []
    }
  },
  computed: {
    ...mapGetters('user', { userId: 'USER_ID' })
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapActions('userDb', ['UPDATE_USER_DB']),
    async updateHobbies() {
      const data = {
        sports: this.checkedSports,
        entertainments: this.checkedEntertainments,
        foods: this.checkedFoods
      }
      const userData = { userId: this.userId, data }
      await this.UPDATE_USER_DB(userData)
      await this.toUserLocation()
    },
    toUserLocation() {
      this.PUSH(UserLocation)
    }
  }
}
</script>
<style scoped>
#preferences {
}
.peferences__list {
}
.preferences__list-title {
  background-color: rgb(193, 193, 193);
}
.preferences__list-header {
  background-color: rgb(215, 215, 215);
  font-size: 18px;
}
.preferences__list-item {
}
</style>

<style scoped>
</style>
