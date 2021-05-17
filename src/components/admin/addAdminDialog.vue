<template>
  <v-layout row wrap >
    <v-dialog v-model="showAdmin" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Add Admin</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
             
               <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.USERID"
                  shaped
                  outlined
                  label="First Name"
                ></v-text-field>
              </v-col>
             
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.FIRSTNAME"
                  shaped
                  outlined
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.LASTNAME"
                  shaped
                  outlined
                  label="Last Name"
                ></v-text-field>
              </v-col>
             
              <v-col cols="12" md="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.EMAIL"
                  d
                  label="Email"
                ></v-text-field>
              </v-col>
             
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dialog() {
      console.log(this.dialog);
    },
  },
  methods: {
    closeDialog() {
      console.log(this.GENDER);
      console.log(moment(this.date).format("x").toString());

      this.$store.commit("adminModule/closeAdminDialog");
    },
    saveDialog() {
      let alumniData = JSON.parse(JSON.stringify(this.alumni));

      this.$store.commit("adminModule/closeAdminDialog");
     
      let data = {
        payload: {
          USERTYPE: "admin",
          FIRSTNAME:alumniData.FIRSTNAME,
          LASTNAME:alumniData.LASTNAME,
          EMAIL: alumniData.EMAIL,
          USERID:alumniData.USERID,
        
        },
      };
     
      this.$store.dispatch("adminModule/addAdmin", data).then((response) => {
        if (response.data.status == 200) {
        //   if (data.payload.EMAIL == undefined) {
        //     this.$store.commit(
        //       "adminModule/addNewAdminToList",
        //       JSON.parse(JSON.stringify(data.payload))
        //     );
        //   } else {
            // this.$store.commit(
            //   "adminModule/appendAdminList",
            //   JSON.parse(JSON.stringify(data.payload))
            // );

            this.$store.commit(
 "adminModule/addNewAdminToList",JSON.parse(JSON.stringify(data.payload))   );
          
          this.$store.commit("showSnackbar", {
            message: "Admin Added successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
        }
      
      });
     
    },
  },
  computed: {
    alumni: {
      get() {
        return this.$store.getters["adminModule/getAdminDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAdminDialogData", data);
      },
    },
    showAdmin: {
      get() {
        return this.$store.getters["adminModule/getshowAdminDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAdminDialog", data);
      },
    },
  },
  data() {
    return {
      salutation_personal_information: "",
      menu_resignation: false,
      menu_relieving: false,
      GENDER: "",
      GENDERs: ["Male", "Female", "Other"],
      date: new Date().toISOString().substr(0, 10),
      DATE_OF_RESIGNATION: new Date().toISOString().substr(0, 10),
      relieving: new Date().toISOString().substr(0, 10),
      menu2: false,
    };
  },
};
</script>

<style >
.v-date-picker-years.li {
  float: none !important;
}
</style>