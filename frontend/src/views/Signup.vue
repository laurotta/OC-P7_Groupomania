<template>
  <b-container>
    <HomeSignupHeader v-bind:titre="titre"/>

    <!-- Formulaire d'inscription -->
    <b-row align-h="center">
      <b-col md="6">
        <h2 class="my-3">Complétez le formulaire ci-dessous</h2>
        <b-card>
          <b-form>

            <!-- Champ nom d'utilisateur -->
            <b-form-group
              label="Entrez un nom d'utilisateur :"
              label-for="input-username"
              :invalid-feedback="invalidUsernameFeedback"
              :valid-feedback="validUsernameFeedback"
              :state="stateUsername"
            >
              <b-form-input
                id="input-username"
                v-model="signup.username"
                required
                aria-describedby="username-help-block"
                trim
              ></b-form-input>
              <b-form-text id="username-help-block">
                Votre nom d'utilisateur doit être composé de 3 à 50 caractères.
              </b-form-text>
            </b-form-group>

            <!-- Champ email -->
            <b-form-group
              label="Entrez un email :"
              label-for="input-email"
              :invalid-feedback="invalidEmailFeedback"
              :valid-feedback="validEmailFeedback"
              :state="stateEmail"
            >
              <b-form-input
                id="input-email"
                v-model="signup.email"
                type="email"
                required
                trim
              ></b-form-input>
            </b-form-group>

            <!-- Champ mot de passe -->
            <b-form-group
              label="Entrez un mot de passe :"
              label-for="input-password"
              :invalid-feedback="invalidPasswordFeedback"
              :valid-feedback="validPasswordFeedback"
              :state="statePassword"
            >
              <b-form-input
                id="input-password"
                v-model="signup.password"
                type="password"
                required
                aria-describedby="password-help-block"
                trim
              ></b-form-input>
              <b-form-text id="password-help-block">
                Votre mot de passe doit être composé de 8 à 12 caratère.<br>
                Il doit comporter au moins une lettre et un chiffre.
              </b-form-text>
            </b-form-group>

            <!-- Bouton de validation -->
            <b-col class="text-center">
              <b-button
                class="my-3"
                type="submit"
                variant="success"
                @click="signUp"
              >
                Envoyer
              </b-button>
            </b-col>
          </b-form>
        </b-card>
      </b-col>
    </b-row>

    <!-- Indication des erreurs -->
    <b-modal
      id="bv-modal-error"
      v-model="signupError"
      hide-footer
      centered
    >
      <template v-slot:modal-title>
        Erreur
      </template>
      <div class="d-block text-center">
        <p>{{ problem }}</p>
      </div>
      <b-button 
        class="mt-3"
        variant="info"
        block
        @click="$bvModal.hide('bv-modal-error')"
      >
        Ok
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
import HomeSignupHeader from "../components/HomeSignupHeader"

export default {
  name: 'Signup',

  components: {
    HomeSignupHeader
  },

  computed: {
    stateUsername() {
      return (this.signup.username.length >= 3 && this.signup.username.length <=50) ? true : false
    },
    invalidUsernameFeedback() {
        if (this.signup.username.length >= 3 && this.signup.username.length <=50) {
          return ''
        } else if (this.signup.username.length > 0 && this.signup.username.length <=50) {
          return 'Au moins 3 caractères'
        } else if (this.signup.username.length >= 51) {
          return '50 caractères maximum'
        } else {
          return ''
        }
      },
    validUsernameFeedback() {
      return this.stateUsername === true ? 'Ok' : ''
    },

    stateEmail() {
      return this.emailRegEx.test(this.signup.email) ? true : false
    },
    invalidEmailFeedback() {
        if (this.signup.email == '') {
          return ''
        } else if (this.emailRegEx.test(this.signup.email) == false) {
          return 'Format incorrect'
        } else {
          return ''
        }
      },
    validEmailFeedback() {
      return this.stateEmail === true ? 'Ok' : ''
    },

    statePassword() {
      return this.passwordRegEx.test(this.signup.password) ? true : false
    },
    invalidPasswordFeedback() {
        if (this.signup.password == '') {
          return ''
        } else if (this.passwordRegEx.test(this.signup.password) == false) {
          return 'Mot de passe invalide...'
        } else {
          return ''
        }
      },
    validPasswordFeedback() {
      return this.statePassword === true ? 'Ok' : ''
    },
  },

  data() {
    return {
      signup: {
        username: '',
        email: '',
        password: ''
      },
      signupOk: '',
      signupError: false,
      problem: '',
      titre: 'Inscription',
      emailRegEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passwordRegEx: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/
    }
  },

  methods: {
    signUp() {
      if (this.signup.username !== null && this.signup.email !== null && this.signup.password !== null) {
        this.$http
          .post("http://localhost:3000/api/auth/signup", this.signup)
          .then(response => {
            console.log(response.status)
            this.signupOk = ''
            this.$bvModal.msgBoxOk('Vous êtes inscrit. Vous pouvez désormais vous connecter.', {
                title: 'Félicitations !',
                centered: true
            })
              .then(value => {
                this.signupOk = value
                if (this.signupOk == true) {
                  this.$router.push({ path: '/' })
                }})
              .catch(error => {
                console.log(error.message);
              });
          })
          .catch(error => {
              this.problem = error.response.data.message;
              this.signupError = !this.signupError
          });
      } else {
        this.problem = 'Veuillez compléter tous les champs.'
        this.signupError = !this.signupError
      }
    }
  }
}
</script>

<style>
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
  text-align: center;
}
@media screen and (max-width: 768px) {
  h1 {
  font-size: 1.6em;
  }
  h2 {
  font-size: 1.2em;
  } 
  img {
    width: 100%;
  }
}
</style>
