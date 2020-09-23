<template>
  <b-container class="fluid my-4">
    <b-row>
      <b-col sm="8" class="centerthis">
        <img class="px-3 imgsize" alt="Groupomania logo" src="../assets/icon-left-font-monochrome-black.svg"/>
        <h1 class="my-3">Réseau social interne</h1>
      </b-col>
      <b-col>
        <div class="user-box">
          <p id="welcome" class="m-3"><b-icon icon="person-circle"></b-icon> {{ username }}</p>
          <div class="m-3">
            <b-button
              type="button"
              size="sm"
              variant="secondary"
              @click="disconnect">
              <b-icon icon="door-open" aria-hidden="true"></b-icon> Déconnexion</b-button>
          </div>
          <div class="m-3">
            <b-button
              type="button"
              size="sm"
              variant="warning"
              @click="unsubscribe">
              <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon> Désinscription</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <AddPublication />
  </b-container>
</template>

<script>
import AddPublication from "../components/AddPublication"

export default {
  components: {
    AddPublication
  },

  data () {
    return {
      username: localStorage.getItem("user"),
      id: localStorage.getItem("userId"),
      unsubscribeUser: ''
    };
  },

  methods: {
    disconnect() {
      localStorage.clear();
      this.$router.push({ path: '/' })
    },

    unsubscribe() {
      this.unsubscribeUser = ''
      this.$bvModal.msgBoxConfirm('Voulez-vous vraiment supprimer votre compte ? Cette opération supprimera également toutes vos publications.', {
          title: 'Attention',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'OUI',
          cancelTitle: 'NON',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.unsubscribeUser = value
            if (this.unsubscribeUser == true) {
              this.$http
                .delete("http://localhost:3000/api/auth/" + this.id, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                  }
                })
                .then(() => {
                  this.disconnect()
                })
                .catch(error => {
                  console.log(error.message);
                });
            }
          })
          .catch(error => {
            console.log(error.message)
          })

    }
  }
};
</script>

<style>
#welcome {
  font-size: 1.2em;

}
.imgsize {
  width: 75%;
}
h1 {
  font-size: 1.8em;
}
.user-box {
  border-left: 1px solid gray;
}
@media screen and (max-width: 768px) {
  .user-box {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    border-left: none;
  }
  h1 {
  font-size: 1.4em;
  }
  .imgsize {
  width: 100%;
  }
}
</style>