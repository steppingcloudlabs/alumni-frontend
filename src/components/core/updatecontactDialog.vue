<template>
  <v-layout row wrap>
    <v-dialog v-model="showContact" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Upadte Contact</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.phone"
                  label="Phone No"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-area v-model="user.address" label="Address"></v-text-area>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
    data(){
return{
    user:{
        phone:"",
        email:"",
        address:""

    }
}
    },
  computed: {

    showContact: {
      get() {
        return this.$store.getters["userModule/getshowContactDialog"];
      },
      set(data) {
        this.$store.commit(
          "adminModule/setShowContactDialog",
          data
        );
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("adminModule/closeContactDialog");
    }
  }
};
</script>