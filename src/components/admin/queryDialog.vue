<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showQuery" persistent max-width="600px">
        <v-card>
          <v-toolbar flat color="primary" dark>
            <v-icon @click="closeDialog">mdi-arrow-left</v-icon>
            <v-toolbar-title>Compose</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="sendDialog">mdi-send</v-icon>
          </v-toolbar>
          <v-form>
            <v-text-field label="Subject"  single-line full-width hide-details></v-text-field>

            <v-divider></v-divider>
            <v-textarea label="Query" single-line full-width></v-textarea>
            <v-divider></v-divider>
            <v-textarea label="Reply from Admin" counter maxlength="500" full-width single-line></v-textarea>
          </v-form>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  computed: {
    query: {
      get() {
        return this.$store.getters["adminModule/getQueryDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowQueryDialogData", data);
      }
    },
    showQuery: {
      get() {
        return this.$store.getters["adminModule/getShowQueryDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowQueryDialog", data);
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("adminModule/closeQueryDialog", {});
    },
    sendDialog() {
      this.$store.commit("adminModule/closeQueryDialog", {});
    }
  }
};
</script>