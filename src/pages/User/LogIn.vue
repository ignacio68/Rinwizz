<template>
  <v-ons-page class="main">
    <the-custom-toolbar
      class="customToolbar"
      :pageTitle="$t('lang.pages.login.toolbar.title')"
      :backLabel="volver">
    </the-custom-toolbar>
    <div class="container">

<!-------------------- LOG IN FORM ------------------------------------------------>

      <form class="form" autocomplete="off">
        <v-ons-list class="form-list">
          <!-- EMAIL INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-ios-email, material:zmdi-email"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="email"
                minlength="6"
                :placeholder="$t('lang.pages.login.input.email')"
                required
                float
                modifier="underbar"
                v-model="email"
              >
              </v-ons-input>
            </div>
          </v-ons-list-item>

           <!-- PASSWORD INPUT -->
           
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-locked, material:zmdi-lock"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="password"
                input-id="password"
                minlength="8"
                :placeholder="$t('lang.pages.login.input.password')"
                required
                float
                modifier="underbar"
                v-model="password"
                v-bind="$attrs"
                ref="passwordInput"
              >
              </v-ons-input>
              <div class="right">
              <v-ons-icon v-if="!passwordVisible"
                icon="ion-eye-disabled, material:zmdi-eye-off"
                class="list-item__icon"
                @click.prevent="togglePassword">
              </v-ons-icon>
              <v-ons-icon v-if="passwordVisible"
                icon="ion-eye, material:zmdi-eye"
                class="list-item__icon"
                @click.prevent="togglePassword">
              </v-ons-icon>
            </div>
            </div>
          </v-ons-list-item>

          <!-- FORGOT PASSWORD -->

          <v-ons-list-item class="text__button">
            <p class="forgotPassword"
              @click.prevent="onForgotPassword">
              {{ $t('lang.pages.login.main.text1') }}
            </p>
          </v-ons-list-item>

        <!-- ERROR -->

          <v-ons-list-item>
            <p v-if="error" class="error">{{ $t('lang.errors.auth.invalidDisplayName') }}</p>
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
      >
        {{ $t('lang.pages.login.button')}}
      </v-ons-button>

      <!-- SIGNUP BUTTON -->
      <div>
        <p class="text__button"
          @click.prevent="toSignUp">
          {{ $t('lang.pages.login.main.text2') }}
        </p>
      </div>

    </div>
  </v-ons-page>
</template>

<script>
  import SignUp from './SignUp'
  export default {
    name: 'log-in',
    data () {
      return {
        volver: '',
        email: '',
        password: '',
        type: 'password',
        passwordVisible: false
      }
    }, 
    created () {
      console.log('Estoy en LogIn.created')
      // this.$store.commit('navigator/pop')
    },
    mounted () {
      console.log('Estoy en LogIn.mounted')
    },
    computed: {
      error () {
        return this.$store.getters['shared/error']
      },
      buttonActive () {
        if (this.email.length >= 6 && this.password.length >= 8) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onLognIn () {
        console.log('Estoy en onLognIn')
        this.$store.dispatch('user/logInUser', {
          email: this.email,
          password: this.password
        })
      },
      togglePassword () {
        this.type = this.type === 'password' ? 'text' : 'password'
        // IMPORTANTE: añadir $el para que funcione setAttribute
        this.$refs.passwordInput.$el.setAttribute('type', this.type)
        this.passwordVisible = !this.passwordVisible
      },
      onForgotPassword () {
        console.log('He olvidado la contraseña')
      },
      toSignUp () {
        this.$store.commit('navigator/replace', SignUp)
      }
    }
  }
</script>

<style scoped>
  .text__button {
    border: 1px solid pink;
    height: 50px;
  }
</style>
