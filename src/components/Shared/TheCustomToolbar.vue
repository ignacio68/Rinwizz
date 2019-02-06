<template>
	<v-ons-toolbar inline>
		<div class="left">
			<slot name="left">
				<v-ons-back-button v-if="backLabel">
					{{ backLabel }}
				</v-ons-back-button>
			</slot>
		</div>
		<div class="center"><slot>{{ pageTitle }}</slot></div>
		<div class="rigth"><slot></slot></div>
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

<style scoped>
</style>
