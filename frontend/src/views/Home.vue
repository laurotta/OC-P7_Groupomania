<template>
  <b-container>
    <HomeSignupHeader v-bind:titre="titre"/>

    <!-- Formulaire de connexion -->
    <b-row align-h="center">
      <b-col md="6" class="text-center">
        <h2 class="my-3">Connectez-vous</h2>
        <b-form>

          <!-- Champ email -->
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="at"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="signin.email"
              type="email"
              required
              placeholder="Entrez votre email"
            ></b-form-input>
          </b-input-group>

          <!-- Champ mot de passe -->
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="key"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="password"
              v-model="signin.password"
              required
              placeholder="Entrez votre mot de passe"
            ></b-form-input>
          </b-input-group>

          <!-- Alerte avec compte à rebours sur erreur 429 -->
          <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="danger"
            @dismiss-count-down="countDownChanged"
          >
            Nouvelle tentative possible dans {{ dismissCountDown }} secondes...
          </b-alert>

          <!-- Bouton "valider" -->
          <b-col class="text-center">
            <b-button
              type="submit"
              variant="success"
              size="lg"
              pill
              v-b-tooltip.hover title="Valider"
              @click.prevent="signIn"
            >
              <b-icon
                icon="power" 
                font-scale="1.5"
                animation="fade"
                aria-label="Valider"
              ></b-icon>
            </b-button>
          </b-col>
        </b-form>
      </b-col>
    </b-row>

    <!-- Accès à la création d'un compte -->
    <b-row align-h="center" class="mt-4">
      <b-col md="6" class="text-center">
        <h2 class="my-3 pt-3">Pas encore inscrit ?</h2>
        <b-button
          variant="primary"
          @click.prevent="$router.push('signup')"
        >
          Je crée mon compte
        </b-button>
      </b-col>
    </b-row>
    
    <!-- Indication des erreurs -->
    <b-modal
      id="bv-modal-erreur"
      v-model="signinError"
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
        @click="$bvModal.hide('bv-modal-erreur')"
      >
        Ok
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
import HomeSignupHeader from "../components/HomeSignupHeader"

export default {
  name: 'Home',

  components: {
    HomeSignupHeader
  },

  data() {
    return {
      signin: {
        email: null,
        password: null,
      },
      signinError: false,
      problem: '',
      titre: 'Bienvenue sur notre réseau social !',
      dismissSecs: 120,
      dismissCountDown: 0,
    };
  },

  methods: {
    signIn() {
      if (this.signin.email !== null && this.signin.password !== null) {
        this.$http
          .post("http://localhost:3000/api/auth/signin", this.signin)
          .then(response => {
            localStorage.setItem("token", response.data.token);
            this.$router.push({ path: "Publications" });
          })
          .catch(error => {
            if (error.response.status == 429) {
              this.dismissCountDown = this.dismissSecs;
            } else {
              this.problem = error.response.data.message;
              this.signinError = !this.signinError;
            }
          });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
};
</script>

<style>
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
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
