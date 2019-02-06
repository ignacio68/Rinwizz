<template>
  <v-ons-button
    class="signUp__button"
    modifier="large"
    ripple="true"
    @click.prevent="parentMethod()"
    >
    <v-ons-icon
      class="signUp__button-icon"
      size="30px"
    ></v-ons-icon>
  </v-ons-button>
</template>

<script>
  export default {
    name: 'social-button',
    props: {
      name: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: ''
      }
    },
    methods: {
      parentMethod () {
        this.$emit('socialButtonEvent')
      }
    }
  }
</script>

<style scoped>
  .signUp__button {
  	display: block;
  	height: 50px;
  	width: 50px;
  	border-radius: 50%;
  	border: 2px solid white;
    background-color: limegreen;
    color: white;
  }
  .signUp__button-icon {
  	position: absolute;
  	left: 10px;
  	top: 10px;
  }
</style>
