<template>
  <v-ons-page class="preferences">
    <div class="container">
      <h3>Elige tus preferencias</h3>
      <br>
      <h3>Deportes</h3>
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

      <h3>Ocio</h3>
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
          @click.prevent="toHomePage"
        >Comenzar!!</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapMutations } from 'vuex'
import HomePage from '@pages/HomePage'
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

    toHomePage() {
      this.PUSH(HomePage)
    }
  }
}
</script>
<style scoped>
.preferences {
}
.peferences__list {
}
.preferences__list-header {
  background-color: rgb(196, 193, 193);
  font-size: 18px;
}
.preferences__list-item {
}
</style>

<style scoped>
</style>
