<template>
  <div
    class="loader-wrapper"
    :style="{backgroundColor: loaderBackgroundColor, opacity: loaderOpacity}">
    <div class="loader">
      <v-ons-progress-circular
        class="loader loader__ripple"
        :style="{width: loaderRippleWidth, heigth: loaderRipperHeigth}"
        indeterminate>
      </v-ons-progress-circular>
    </div>
    </div>
</template>
<script>
export default {
  name: 'the-preloader',
  props: {
    loaderBackgroundColor: {
      type: String,
      default: 'blue'
    },
    loaderOpacity: {
      type: String,
      default: '0.7'
    },
    loaderRippleWidth: {
      type: String,
      default: '4em'
    },
    loaderRipperHeigth: {
      type: String,
      default: '4em'
    }
  }
}
</script>
<style scoped>
.loader-wrapper{
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1.0;
}
.loader {
  position: absolute;
  display: block;
  overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

}
.loader__ripple {
  width: 4em;
  height: 4em;
}
</style>
