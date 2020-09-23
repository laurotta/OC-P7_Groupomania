<template>
  <div id="mainpage" class="centerthis mt-3">
    <Header />
    <b-col
      sm="8"
      v-for="publication in publications"
      :key="publication.id"
      class="my-3">
      <b-card
        header-tag="header"
        footer-tag="footer"
        class="content"
        tag="article">

        <template v-slot:header>
          <p class="mb-0"><strong>{{ publication.User.username }}</strong></p>
        </template>

        <b-card-text>{{ publication.content }}</b-card-text>
        <b-row>
          <b-col class="text-center">
            <b-img v-if="publication.imageUrl !== null" :src="publication.imageUrl" fluid alt=""></b-img>
          </b-col>
        </b-row>
        <b-row align-h="end">
        <b-col md="2" offset-md="2" v-if="moderator == 1 || user == publication.User.username">
            
              <!--<b-button
                class="my-3"
                variant="warning"
                size="sm"
                @click="modify(publication)"
                >Modifier</b-button>-->
              <b-button
                class="mx-3 mt-3"
                variant="danger"
                size="sm"
                v-b-tooltip.hover title="Supprimer"
                @click="alertDestroy(publication)"
                ><b-icon icon="trash"></b-icon></b-button>
            
        </b-col>
        </b-row>

        <template v-slot:footer>
          <b-icon icon="calendar2-check"></b-icon>
          <span class="datetime">{{ publication.createdAt | formatDate }}</span>
        </template>
      </b-card>
    </b-col>
  </div>
</template>

<script>
import Header from "../components/Header"

export default {

  components: {
    Header
  },

  data () {
    return {
      publications: [],
      user: localStorage.getItem("user"),
      moderator: localStorage.getItem("moderator"),
      destroyPublication: '',
    }
  },
  
  mounted() {
    this.$http
      .get("http://localhost:3000/api/publications", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.publications = response.data
      })
      .catch(error => {
        console.log(error.message);
      }) 
  },

  methods: {
    alertDestroy(publication) {
      this.destroyPublication = ''
      this.$bvModal.msgBoxConfirm('Voulez-vous vraiment supprimer cette publication ?', {
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
            this.destroyPublication = value
            if (this.destroyPublication == true) {
              this.$http
                .delete("http://localhost:3000/api/publications/" + publication.id, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                  }
                })
                .then(() => {
                  window.location.reload()
                })
                .catch(error => {
                  console.log(error.message);
                });
            }
          })
          .catch(error => {
            console.log(error.message)
          })
    },
    /*modify(publication) {
      this.$http
        .put("http://localhost:3000/api/publications/" + publication.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          content: publication.content,
          file: publication.file
        })
        .then(() => {
          
        })
        .catch(error => {
          console.log(error.message);
        }) 
    },*/
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
.content {
  box-shadow: 0px 0px 10px 4px grey;
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
.datetime {
  font-size: 0.85em;
  color:slategrey;
  padding-left: 0.7em;
}
</style>