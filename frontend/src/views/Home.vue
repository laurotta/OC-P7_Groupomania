<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="8" class="text-center">
        <img  class="mt-3" src="../assets/logo.png" alt="Groupomania logo"/>
        <h1>Bienvenue sur notre réseau social !</h1>
        <hr/>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col md="6">
        <h2 class="my-3">Connectez-vous</h2>
        <b-form>
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

          <b-col class="text-center">
            <b-button
              type="submit"
              variant="success"
              size="lg"
              pill
              v-b-tooltip.hover title="Valider"
              @click.prevent="signIn">
                <b-icon icon="power" font-scale="1.5" animation="fade" aria-label="Valider"></b-icon>
              </b-button>
          </b-col>
        </b-form>
      </b-col>
    </b-row>

    <b-row align-h="center" class="mt-4">
      <b-col md="6" class="text-center">
        <h2 class="my-3 pt-3">Pas encore inscrit ?</h2>
        <b-button variant="primary" @click.prevent="$router.push('signup')">Je crée mon compte</b-button>
      </b-col>
    </b-row>
    
    <b-modal
      id="bv-modal-erreur"
      v-model="signinError"
      hide-footer
      centered>
      <template v-slot:modal-title>
        Erreur
      </template>
      <div class="d-block text-center">
        <p>Vérifiez votre email ou votre mot de passe !</p>
      </div>
      <b-button
        class="mt-3"
        variant="info"
        block
        @click.prevent="$bvModal.hide('bv-modal-erreur')">Fermer</b-button>
    </b-modal>

  </b-container>
</template>

<script>
export default {
  data() {
    return {
      signin: {
        email: "",
        password: "",
      },
      signinError: false,
    };
  },

  methods: {
    signIn() {
      if (this.signin.email !== null && this.signin.password !== null) {
        this.$http
          .post("http://localhost:3000/api/auth/signin", this.signin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.username);
            localStorage.setItem("moderator", response.data.moderator);
            localStorage.setItem("userId", response.data.userId);
            this.$router.push({ path: "Publications" });
          })
          .catch(() => {
            this.signinError = !this.signinError;
          });
      }
    },
  },
};
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
  img {
    width: 100%;
  }
  
}
</style>
