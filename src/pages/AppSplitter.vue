<template>
  <v-ons-splitter>
    <v-ons-splitter-side
      collapse=""
      swipeable
      width="75%"
      side="left"
      :swipe-target-width="md && 25"
      :animation="md ? 'overlay' : 'reveal'"
      :open.sync="isOpen"
    >
      <settings></settings>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <home-page></home-page>
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>

<script>
import Settings from './Settings'
import HomePage from './HomePage'
export default {
  name: 'AppSplitter',
  components: {
    Settings,
    HomePage
  },
  data() {
    return {
      isOpen: true
    }
  }
}
</script>

<style></style>
