<template>
  <v-ons-page id="preferences">
    <div class="content">
      <p>{{ $t('lang.views.hobbies.main') }}</p>
      <br >
      <!------ DEPORTES ------->
      <v-ons-list-title class="preferences__list-title">
        Deportes
      </v-ons-list-title>
      <v-ons-list class="sports__list">
        <v-ons-list-item
          v-for="(sport, $index) in sports"
          :key="sport"
          class="preferences__list-item"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              v-model="checkedSports"
              :input-id="'checkbox-' + $index"
              :value="sport"
            />
          </label>
          <label class="center"
:for="'checkbox-' + $index">{{ sport }}</label>
        </v-ons-list-item>
      </v-ons-list>

      <!------ OCIO ------->
      <v-ons-list-title class="preferences__list-title">
        Ocio
      </v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-item
          v-for="(entertainment, $index) in entertainments"
          :key="entertainment"
          class="preferences__list-item"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              v-model="checkedEntertainments"
              :input-id="'checkbox-' + $index"
              :value="entertainment"
            />
          </label>
          <label class="center"
:for="'checkbox-' + $index">
            {{ entertainment }}
          </label>
        </v-ons-list-item>
      </v-ons-list>

      <!------ COMIDA Y BEBIDA ------->
      <v-ons-list-title class="preferences__list-title">
        Comida y bebida
      </v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-item
          v-for="(food, $index) in foods"
          :key="food"
          class="preferences__list-item"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              v-model="checkedFoods"
              :input-id="'checkbox-' + $index"
              :value="food"
            />
          </label>
          <label class="center"
:for="'checkbox-' + $index">{{ food }}</label>
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
        >
          {{ $t('lang.views.hobbies.button') }}
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
// import UserLocation from './UserLocation'
import Greetings from './Greetings'
export default {
  name: 'Hobbies',
  namespace: true,
  data() {
    return {
      // TODO: INTERNACIONALIZAR!!
      sports: ['Futbol', 'Baloncesto', 'Natación sincronizada'],
      entertainments: ['cine', 'teatro', 'viajes'],
      foods: ['restaurantes', 'bares', 'discos'],
      checkedSports: [],
      checkedEntertainments: [],
      checkedFoods: []
    }
  },
  computed: {},
  methods: {
    ...mapMutations('navigator', ['PUSH']),
    ...mapMutations('user', ['UPDATE_USER']),
    updateHobbies() {
      const userData = {
        preferences: { sports: [], entertainments: [], foods: [] }
      }
      userData.preferences.sports.push(this.checkedSports)
      userData.preferences.entertainments.push(this.checkedEntertainments)
      userData.preferences.foods.push(this.checkedFoods)
      this.UPDATE_USER(userData)
      this.toUserLocation()
    },
    toUserLocation() {
      this.PUSH(Greetings)
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

<style scoped></style>
