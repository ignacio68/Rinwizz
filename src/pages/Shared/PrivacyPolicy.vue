<template>
  <v-ons-page>
    <the-custom-toolbar
      :backLabel="volver"
      :pageTitle="toolbarTitle"
    ></the-custom-toolbar>
    <div class="container"></div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'privacy-policy',
  data() {
    return {
      isActive: false,
      volver: ''
    }
  },
  computed: {
    toolbarTitle() {
      return this.$t('lang.pages.privacy.toolbar.title')
    }
  }
}
</script>

<style scoped></style>
