<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showEmailDialog" persistent width="400px" height="300px">
        <v-card>
          <v-card-title>
            <span class="headline pb-2">Add Email</span>
          </v-card-title>
          <v-card-text class="py-0">
            <v-col cols="12" class="pb-0">
              <v-select
                :items="escalationList"
                item-value="_id"
                item-text="email"
                v-model="selectedItem"
                label="Outlined style"
                outlined
                @change="checks"
                clearable
              ></v-select>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" :disabled="!selectedItem" text @click="saveDialog">Save</v-btn>
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
      tempEmail: "",
      selectedItem: undefined
    };
  },
  props: {
    editEsclationData: {
      type: Object
    },
    showEmailDialog: {
      type: Boolean
    },
    escalationList: {
      type: Array,
      default: []
    }
  },
  methods: {
    closeDialog() {
      this.selectedItem = undefined;
      this.$emit("closeDialog");
    },
    checks() {
      console.log(this.selectedItem);
    },
    saveDialog() {
      this.$emit(
        "saveEsclationData",
        JSON.parse(JSON.stringify(this.selectedItem))
      );
      setTimeout(() => {
        this.selectedItem = undefined;
      }, 1000);
    }
  }
};
</script>