<template>
  <v-ons-button
    class="signUp__button"
    modifier="large"
    ripple="true"
    @click.prevent="parentMethod()"
  >
    <v-ons-icon class="signUp__button-icon" size="30px"></v-ons-icon>
  </v-ons-button>
</template>

<script>
// TODO: REVISAR EL COMPONENTE
export default {
  /**
   * Botón para redes sociales
   */
  name: 'circle-button',
  props: {
    /**
     * Nombre de la red social
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * Indice
     */
    index: {
      type: Number,
      default: ''
    } /*,
    color: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    } */
  },
  methods: {
    parentMethod() {
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
