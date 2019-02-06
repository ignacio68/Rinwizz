<template>
  <v-ons-page class="main">
    <!--the-custom-toolbar
      :pageTitle="$t('lang.pages.signup.toolbar.title')" >
    </the-custom-toolbar-->
    <div class="container">
      <p class="mainText">{{ $t('lang.pages.signup.main.text1') }}</p>

<!-------SIGNUP WITH EMAIL & PASSWORD ------>

      <form class="form" autocomplete="off">
        <v-ons-list>

          <!-- NAME INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-person, material:zmdi-account"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="name"
                :placeholder="$t('lang.pages.signup.input.name')"
                float
                modifier="transparent"
                v-model="name"
                required
              >
              </v-ons-input>
            </div>
          </v-ons-list-item>

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
                :placeholder="$t('lang.pages.signup.input.email')"
                required
                float
                modifier="transparent"
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
                :placeholder="$t('lang.pages.signup.input.password')"
                required
                float
                modifier="transparent"
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

        </v-ons-list>

        <!-- ERROR -->

        <v-ons-list-item>
          <p v-if="error" class="error">{{ $t('lang.errors.auth.invalidDisplayName') }}</p>
        </v-ons-list-item>
      </form>

      <!-- BUTTON SIGNUP -->

      <div class="signUp">
         <v-ons-button
          name="signUpButton"
          class="signUp__button center"
          modifier="large"
          :disabled="false"
          ripple="true"
          @click.prevent="onSignUp"
        >
          {{ $t('lang.pages.signup.button')}}
        </v-ons-button>
      </div>

<!------ LOGIN WITH SOCIAL BUTTONS ------>

      <div class="socialText">
        <p class="socialButtons__text">{{ $t('lang.pages.signup.main.socialText') }}</p>
      	<v-ons-row class="socialButtons__list">
	        <!--sign-up-button
	          class="socialButtonsList__item-button"
	          :name="socialButton.name"
	          :index="$index"
	          :icon="socialButton.icons"
	          :style="{ backgroundColor: socialButton.color }"
	          @socialButtonEvent="socialLogIn($index)"
	        /-->
	        <circle-button
            v-for="(socialButton, $index) in socialButtons" :key="socialButton.id"
	          class="socialButtons__list-button"
	          :name="socialButton.name"
	          :index="$index"
	          :icon="socialButton.icons"
	          :style="{ backgroundColor: socialButton.color }"
	          @socialButtonEvent="socialLogIn($index)"
	        />
        </v-ons-row>
      </div>

<!------ TERMS OF USE & POLICY PRIVACITY ------>

      <div class="privacy">
        <i18n
          class="privacy__text"
          path="lang.pages.signup.main.text3"
          >
          <span
            class="privacy__text-link"
            @click.prevent="toTerms"
            place="terms">{{ terms }}</span>
          <span
            class="privacy__text-link"
            @click.prevent="toPrivacy"
            place="privacy">{{ privacy }}</span>
        </i18n>
      </div>

<!-- I HAVE A USER ACCOUNT -->

      <p class="logInText"
        @click.prevent="toLogIn">
        {{ $t('lang.pages.signup.main.text2') }}
      </p>

    </div>

<!------ CONFIRM PASSWORD ALERT ------>

    <v-ons-alert-dialog
      class="AlertDialog_text" 
      modifier="rowfooter"
      :title="$t('lang.components.alertConfirmPassword.alertText')"
      :visible.sync="actionPass"
    >
      <template slot="footer">
        <v-ons-alert-dialog-button
          class="alertDialog_button"
          ripple="true"
          @click.prevent="onClickAlertButton()"
        >
          {{ $t('lang.components.alertConfirmPassword.buttonText') }}
        </v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>

  </v-ons-page>
</template>

<script>
  import Configuration from './Configuration'
  import TermsOfService from '../Shared/TermsOfService'
  import PrivacyPolicy from '../Shared/PrivacyPolicy'
  import LogIn from './LogIn'
  // import SignUpButton from '../../components/Shared/SignUpButton'
  import CircleButton from '../../components/Shared/CircleButton'
  // import UserInputPassword from '../../components/Shared/UserInputPassword'
  export default {
    name: 'sign-up',
    components: {
      // SignUpButton,
      CircleButton
      // UserInputPassword
    },
    data () {
      return {
        isActive: false, // Activa el PreLoaderS
        name: '',
        email: '',
        password: '',
        type: 'password',
        passwordVisible: false
      }
    },
    created () {
      console.log('Estoy en SignUp.created')
    },
    mounted () {
      console.log('Estoy en SignUp.mounted')
    },
    computed: {
      socialButtons () {
        // NOTA: revisar para llamar directamente al state
        return this.$store.getters['social/socialButtons']
      },
      user () {
        // NOTA: revisar para llamar directamente al state
        return this.$store.getters['user/user']
      },
      error () {
        // NOTA: revisar para llamar directamente al state
        return this.$store.getters['shared/error']
      },
      loading () {
        // NOTA: revisar para llamar directamente al state
        return this.$store.getters['shared/loading']
      },
      actionPass () {
        // NOTA: revisar para llamar directamente al state
        return this.$store.getters['shared/actionPass']
      },
      terms () {
        return this.$t('lang.pages.signup.main.terms')
      },
      privacy () {
        return this.$t('lang.pages.signup.main.privacy')
      }
    },
    methods: {
      socialLogIn (index) {
        this.$store.dispatch('social/dispatchLogUp', index)
      },
      toLogIn () {
        this.$store.commit('navigator/replace', LogIn)
      },
      onSignUp () {
        console.log('Estoy en onSignUp')
        // enviamos los datos del usuario para su registro
        this.$store.dispatch('user/signUpUser', {
          name: this.name,
          email: this.email,
          password: this.password
        })
      },
      onDismissed () {
        console.log('estoy en onDismissed!!')
        this.$store.dispatch('shared/clearError', null)
      },
      toTerms () {
        this.$store.commit('navigator/push', TermsOfService)
      },
      toPrivacy () {
        this.$store.commit('navigator/push', PrivacyPolicy)
      },
      togglePassword () {
        this.type = this.type === 'password' ? 'text' : 'password'
        // IMPORTANTE: añadir $el para que funcione setAttribute
        this.$refs.passwordInput.$el.setAttribute('type', this.type)
        this.passwordVisible = !this.passwordVisible
      },
      onClickAlertButton () {
        console.log('Estoy en el botón de la alerta de confirmación de password')
        this.$store.commit('shared/setActionPass', false)
        this.$store.commit('navigator/replace', Configuration)
        this.$store.dispatch('user/confirmPassword', this.email)
      }
    }
  }
</script>

<style scoped>
  .form {
    margin-left: auto;
    margin-right: auto;
    width: 90%;

  }
  .form__input {
    height: 50px;
    background-color: #eee;
  }
  .signUp {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  };
  .list-item__icon {
    size: 25px;
  }
  .mainText {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }
  .logInText {
    padding-top: 20px;
    text-align: center;
    color: red;
  }
  .socialButtons__text {
    text-align: center;
  }
  .socialButtons__list {
    background-color: #eee;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
     border: 1px, solid, blue;
  }
  .socialButtons__list-button{
    display: inline;
    padding: 0px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px, solid, red;
  }
  .privacy {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .privacy__text-link {
    color: rebeccapurple;
  }
  .error {
    color: red;
  }
</style>
