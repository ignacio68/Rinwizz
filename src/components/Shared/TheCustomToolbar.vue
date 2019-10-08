<template>
  <v-ons-toolbar inline>
    <template #left class="left">
      <v-ons-back-button v-if="backLabel">
        {{ backLabel }}
      </v-ons-back-button>
    </template>
    <template #default class="center">
      <p>
        {{ pageTitle }}
      </p>
    </template>
    <template #right class="rigth"></template>
  </v-ons-toolbar>
</template>

<script>
export default {
  name: 'the-custom-toolbar',

  props: {
    backLabel: {
      type: String,
      default: ''
    },
    pageTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
