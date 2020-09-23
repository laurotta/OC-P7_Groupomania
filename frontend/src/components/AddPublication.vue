<template>
  <b-row class="justify-content-md-center">
    <b-col sm="8" class="my-3">
      <b-button
        block
        v-b-toggle.collapse-1
        variant="primary">Ajouter une publication</b-button>

        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <b-form-group>
              <b-form-textarea
                id="textarea"
                v-model="publicationElements.content"
                required
                placeholder="Que voulez-vous dire ?"
                rows="3"
                aria-describedby="textarea-help-block">
              </b-form-textarea>
              <b-form-text id="textarea-help-block">
                Champ requis, minimum 7 caractères.
              </b-form-text>

              <p class="mt-4">Ajouter une image ? (facultatif)</p>

              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                accept=".jpg, .png, .gif"
                placeholder="Votre fichier..."
                drop-placeholder="Déposez un fichier ici...">
              </b-form-file>

              <b-button
                class="mt-2"
                size="sm"
                variant="secondary"
                @click="file = null">Reset</b-button>

              <p class="mt-2">Fichier sélectionné : {{ file ? file.name : '' }}</p>
              
              <b-col class="centerthis">
                <b-button
                  class="mt-3"
                  type="submit"
                  variant="success"
                  @click="add">
                  <b-icon icon="upload" aria-hidden="true"></b-icon> Publier</b-button>
              </b-col>
            </b-form-group>
          </b-card>
        </b-collapse>

        <b-modal
          id="bv-modal-error"
          v-model="addError"
          hide-footer
          centered>
          <template v-slot:modal-title>
            Erreur
          </template>
          <p>Rappel :<br>Un texte d'au moins 7 caractères est requis.</p>
          <b-button 
            class="mt-3"
            variant="info"
            block @click="$bvModal.hide('bv-modal-error')">Ok</b-button>
        </b-modal>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AddPublication",
  data() {
    return {
      publicationElements: {
        userId: localStorage.getItem("userId"),
        content: null,
      },
      file: null,
      addError: false
    }
  },
  methods: {
    add() {
      if (this.publicationElements.content === null || this.publicationElements.content.length <= 6) {
        this.addError = !this.addError
      } else {
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('content', this.publicationElements.content);
      formData.append('userId', this.publicationElements.userId);
      
      this.$http
        .post('http://localhost:3000/api/publications/addPublication', formData, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response);
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  }
}
</script>

<style>
.custom-file-input:lang(fr) ~ .custom-file-label::after {
  content: 'Parcourir';
}
</style>