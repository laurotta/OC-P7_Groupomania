<template>
  <b-container class="fluid">
    <b-col class="centerthis">
      <img alt="Groupomania logo" src="../assets/logo.png">
      <h1>Bienvenue sur notre réseau social !</h1>
      <b-col sm="6">
        <h2>Inscription</h2>
        <b-form>
          <b-form-group
            label="Nom d'utilisateur :"
            label-for="input-username">
            <b-form-input
              id="input-username"
              v-model="signup.username"
              required
              placeholder="Entrez votre nom d'utilisateur"
              aria-describedby="username-help-block">
            </b-form-input>
            <b-form-text id="username-help-block">
              Votre nom d'utilisateur doit être composé de 3 à 50 caractères.
            </b-form-text>
          </b-form-group>

          <b-form-group
            label="Email :"
            label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="signup.email"
              type="email"
              required
              placeholder="Entrez votre email">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Mot de passe :"
            label-for="input-password">
            <b-form-input
              id="input-password"
              type="password"
              v-model="signup.password"
              required
              placeholder="Entrez votre mot de passe"
              aria-describedby="password-help-block">
            </b-form-input>
            <b-form-text id="password-help-block">
              Votre mot de passe doit être composé de 8 à 12 caratère.<br>
              Il doit comporter au moins une lettre et un chiffre.
            </b-form-text>
          </b-form-group>

          <b-col class="centerthis">
            <b-button class="margin" type="submit" variant="success" @click.prevent="signUp">Créer</b-button>
          </b-col>

          <b-modal
            id="bv-modal-success"
            v-model="signupOk"
            hide-footer
            centered>
            <template v-slot:modal-title>
              Félicitations !
            </template>
            <div class="d-block text-center">
              <p>Votre compte a été créé.</p>
            </div>
            <b-button class="mt-3" variant="info" block @click="$bvModal.hide('bv-modal-success')">Fermer</b-button>
          </b-modal>

          <b-modal
            id="bv-modal-error"
            v-model="signupError"
            hide-footer
            centered>
            <template v-slot:modal-title>
              Erreur
            </template>
            <div class="d-block text-center">
              <p>Vérifiez vos informations !</p>
            </div>
            <b-button class="mt-3" variant="info" block @click="$bvModal.hide('bv-modal-error')">Fermer</b-button>
          </b-modal>
        </b-form>
      </b-col>
    </b-col>
  </b-container>
</template>

<script>
export default {
    data() {
      return {
        signup: {
          username: null,
          email: null,
          password: null
        },
        signupOk: false,
        signupError: false
      }
    },
    methods: {
      signUp() {
        if (this.signup.username !== null && this.signup.email !== null && this.signup.password !== null) {
          this.$http
            .post("http://localhost:3000/api/auth/signup", this.signup)
            .then(response => {
              console.log(response)
              this.signupOk = !this.signupOk
              this.$router.push({ path: '/' })
            })
            .catch(error => {
              console.log(error)
              this.signupError = !this.signupError
            })
        }
      }
    }
  }
</script>

<style>
.centerthis {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.margin {
  margin: 1em;
}
img {
  width: 100%;
  height: auto;
}
h1 {
  font-size: 2em;
  text-align: center;
}
h2 {
  font-size: 1.5em;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 1em;
}
@media screen and (min-width: 768px) {
  img {
    width: auto;
  }
}
</style>
