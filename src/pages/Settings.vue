<TODO: repasar todo>
<template>
  <v-ons-page>
    <div class="content">
      <h3>settings</h3>
      <v-ons-list class="followingList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="alertsList__item"
          v-for="following in followings"
          :key="following.id"
        >
          <v-ons-card>
            <v-ons-row>
              <h3>nombre:</h3>
              <p class="following_name">{{ following.name }}</p></v-ons-row
            >

            <v-ons-row>
              <h2>email:</h2>
              <p class="following_email">{{ following.email }}</p></v-ons-row
            >
          </v-ons-card>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      followings: {}
    }
  }
}
</script>

<style scoped>
.following_name {
  font-size: 18px;
  color: black;
}
,
.following_email {
  font-size: 14px;
  color: darkslategray;
}
</style>
