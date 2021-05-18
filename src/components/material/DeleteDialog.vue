<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showDeleteDialog" persistent width="400px" height="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Delete</span>
          </v-card-title>
          <v-card-text>
            <span>Do you want to delete item?</span>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeDialog">No</v-btn>
            <v-btn color="blue darken-1" text @click="saveDialog">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    showDeleteDialog: {
      set(data) {
        this.$store.commit("setShowDeleteDialog", data);
      },
      get() {
        return this.$store.getters.getShowDeleteDialog;
      }
    },
    objectToDelete() {
      return this.$store.getters.getDeleteDialogData;
    },
    deleteDialogCommitCall() {
      return this.$store.getters.getDeleteDialogCommitCall;
    },
    deleteActionToDispatch() {
      return this.$store.getters.getDeleteActionToDispatch;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("closeDeleteDialog");
    },
    saveDialog() {
      this.$store.commit("closeDeleteDialog");
      this.$store.commit("showProgressBar", {});
      this.$store
        .dispatch(
          "adminModule/" + this.deleteActionToDispatch,
          this.objectToDelete
        )
        .then(response => {
          if (response.data.status == 200) {
            if (this.objectToDelete) {
              this.$store.commit(
                "adminModule/" + this.deleteDialogCommitCall,
                this.objectToDelete
              );
            }
            this.$store.commit("showSnackbar", {
              color: "success",
              duration: 3000,
              message: "Successfully Deleted",
              heading: "Success"
            });
          }
          else
          {
              this.$store.commit("showSnackbar", {
              color: "Error",
              duration: 3000,
              message: response.data.result,
              heading: "Error"
            });
          }
          this.$store.commit("closeProgressBar", {});
        })
        .catch(error => {
          this.$store.commit("closeProgressBar", {});
          this.$store.commit("showNetworkError");
        });
    }
  }
};
</script>