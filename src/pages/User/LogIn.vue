<template>
  <v-ons-page class="main">
    <the-custom-toolbar
      class="customToolbar"
      :pageTitle="$t('lang.pages.login.toolbar.title')"
      :backLabel="volver"
    ></the-custom-toolbar>
    <div class="container">
      <!-------------------- LOG IN FORM ------------------------------------------------>

      <form class="form" autocomplete="off">
        <v-ons-list class="form-list">
          <!-- EMAIL INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon icon="ion-ios-email, material:zmdi-email" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="email"
                minlength="6"
                :placeholder="$t('lang.pages.login.input.email')"
                required
                float
                modifier="underbar transparent"
                v-model="email"
              ></v-ons-input>
            </div>
          </v-ons-list-item>

          <!-- PASSWORD INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon icon="ion-locked, material:zmdi-lock" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="text"
                input-id="password"
                minlength="8"
                :placeholder="$t('lang.pages.login.input.password')"
                required
                float
                modifier="underbar transparent"
                v-model="password"
                v-bind="$attrs"
                ref="passwordInput"
              ></v-ons-input>
              <div class="right">
                <v-ons-icon
                  v-if="!passwordVisible"
                  icon="ion-eye-disabled, material:zmdi-eye-off"
                  class="list-item__icon"
                  @click.prevent="togglePassword"
                ></v-ons-icon>
                <v-ons-icon
                  v-if="passwordVisible"
                  icon="ion-eye, material:zmdi-eye"
                  class="list-item__icon"
                  @click.prevent="togglePassword"
                ></v-ons-icon>
              </div>
            </div>
          </v-ons-list-item>

          <!-- ERROR -->

          <v-ons-list-item>
            <p v-if="isError" class="error">{{ errorMessage }}</p>
          </v-ons-list-item>

          <!-- FORGOT PASSWORD -->

          <v-ons-list-item class="text__button">
            <p
              class="forgotPassword"
              @click.prevent="onForgotPassword"
            >{{ $t('lang.pages.login.main.text1') }}</p>
          </v-ons-list-item>
        </v-ons-list>
      </form>

      <!---------------------------END FORM -------------------------------------------------->

      <!-- BUTTON LOGIN -->

      <v-ons-button
        class="center"
        modifier="large"
        :disabled="buttonActive"
        ripple="true"
        @click.prevent="onLognIn"
      >{{ $t('lang.pages.login.button') }}</v-ons-button>

      <!------ LOGIN WITH SOCIAL BUTTONS ------>

      <div class="socialText">
        <p class="socialButtons__text">{{ $t('lang.pages.login.main.socialText') }}</p>
        <v-ons-row class="socialButtons__list">
          <circle-button
            v-for="(socialButton, $index) in socialButtons"
            :key="socialButton.id"
            class="socialButtons__list-button"
            :name="socialButton.name"
            :index="$index"
            :icon="socialButton.icons"
            :style="{ backgroundColor: socialButton.color }"
            @socialButtonEvent="socialLogIn($index)"
          />
        </v-ons-row>
      </div>

      <!-- SIGNUP BUTTON -->
      <div>
        <p class="text__button" @click.prevent="toSignUp">{{ $t('lang.pages.login.main.text2') }}</p>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import SignUp from './SignUp'
import CircleButton from '@components/Shared/CircleButton'
export default {
  name: 'log-in',
  components: {
    CircleButton
  },
  data() {
    return {
      volver: '',
      email: '',
      password: '',
      type: 'text',
      passwordVisible: true
    }
  },
  created() {
    console.log('LogIn.created')
  },
  mounted() {
    console.log('LogIn.mounted')
  },
  computed: {
    ...mapGetters('errors', { errorMessage: 'ERROR_MESSAGE' }),
    ...mapGetters('shared', { isError: 'ERROR' }),
    ...mapGetters('social', { socialButtons: 'SOCIAL_BUTTONS' }),

    buttonActive() {
      if (this.email.length >= 6 && this.password.length >= 8) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapMutations('navigator', ['REPLACE']),
    ...mapActions('social', ['DISPATCH_SIGNUP']),
    ...mapActions('user', ['LOGIN_USER']),

    onLognIn() {
      console.log('onLognIn')
      this.LOGIN_USER({
        email: this.email,
        password: this.password
      })
    },
    togglePassword() {
      this.type = this.type === 'password' ? 'text' : 'password'
      // IMPORTANTE: añadir $el para que funcione setAttribute
      this.$refs.passwordInput.$el.setAttribute('type', this.type)
      this.passwordVisible = !this.passwordVisible
    },
    onForgotPassword() {
      console.log('He olvidado la contraseña')
    },
    toSignUp() {
      this.REPLACE(SignUp)
    },
    socialLogIn(index) {
      this.DISPATCH_SIGNUP(index)
    }
  }
}
</script>

<style scoped>
.text__button {
  height: 50px;
}
.socialButtons__text {
  text-align: center;
}
.socialButtons__list {
  background-color: #eee;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
.socialButtons__list-button {
  display: inline;
  padding: 0px;
  margin-left: 10px;
  margin-right: 10px;
}
.error {
  color: red;
}
</style>
