<template>
  <v-ons-page id="preferences">
    <div class="container">
      <h3>Elige tus preferencias</h3>
      <br>
      <v-ons-list-title class="preferences__list-title">Deportes</v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-header class="preferences__list-header">Futbol</v-ons-list-header>
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(futbolClub, $index) in futbolClubs"
          :key="futbolClub"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="futbolClub"
              v-model="checkedFutbolClub"
            >
            </v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >
            {{ futbolClub }}
          </label>
        </v-ons-list-item>

        <v-ons-list-header class="preferences__list-header">Baloncesto</v-ons-list-header>
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(basketClub, $index) in basketClubs"
          :key="basketClub"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="basketClub"
              v-model="checkedBasketClub"
            >
            </v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >
            {{ basketClub }}
          </label>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list-title class="preferences__list-title">Ocio</v-ons-list-title>
      <v-ons-list class="preferences__list">
        <v-ons-list-item
          class="preferences__list-item"
          v-for="(enterteinment, $index) in enterteinments"
          :key="enterteinment"
          tappable
        >
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + $index"
              :value="enterteinment"
              v-model="checkedEnterteinment"
            >
            </v-ons-checkbox>
          </label>
          <label
            class="center"
            :for="'checkbox-' + $index"
          >
            {{ enterteinment }}
          </label>
        </v-ons-list-item>
      </v-ons-list>

      <div class="homePageButton">
        <v-ons-button
          class="homePageButton__button"
          name="homePageButton"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="toGreetings"
        >Comenzar!!</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import greetings from './Greetings'
export default {
  name: 'preferences',
  data() {
    return {
      futbolClubs: ['Real Madrid', 'Atlético de Madrid', 'Barcelona'],
      basketClubs: ['Real Madrid', 'Estudiantes', 'Barcelona'],
      enterteinments: ['cine', 'teatro', 'restaurante', 'viajes'],
      checkedFutbolClub: [],
      checkedBasketClub: [],
      checkedEnterteinment: []
    }
  },
  methods: {
    ...mapMutations('navigator', ['PUSH']),

    toGreetings() {
      this.PUSH(greetings)
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
