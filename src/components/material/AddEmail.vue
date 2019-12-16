<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showEmailDialog" persistent width="400px" height="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Email</span>
          </v-card-title>
          <v-card-text>
            <v-col cols="12">
              <v-text-field type="text" v-model="tempName" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="text" v-model="tempEmail" label="Email"></v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      tempName: "",
      tempEmail: ""
    };
  },
  props: {
    editEsclationData: {
      type: Object
    },
    showEmailDialog: {
      type: Boolean
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveDialog() {
      this.$emit("saveEsclationData", {});
    }
  }
};
</script>