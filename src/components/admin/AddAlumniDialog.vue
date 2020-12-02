<template>
  <v-layout row wrap>
    <v-dialog v-model="showAlumni" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Add Alumni</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.USER_ID"
                  label="Employee Id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  shaped
                  outlined
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="alumni.DATE_OF_BIRTH"
                      label="Date of Birth"
                      prepend-icon="event"
                      readonly
                      shaped
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="alumni.DATE_OF_BIRTH"
                    @input="menu2 = false"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="alumni.GENDER"
                  :items="GENDERs"
                  label="GENDER"
                  placeholder="Select GENDER"
                  required
                  shaped
                  outlined
                ></v-autocomplete>
                <!-- <v-overflow-btn
                  class="my-2"
                  v-model="alumni.GENDER"
                  :items="GENDERs"
                  label="GENDER"
                  target="#dropdown-example"
                ></v-overflow-btn>-->
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-text-field v-model="alumni.salutation_personal_information" label="Salutation"></v-text-field>
              </v-col>-->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.FIRST_NAME_PERSONAL_INFORMATION"
                  shaped
                  outlined
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.LAST_NAME_PERSONAL_INFORMATION"
                  shaped
                  outlined
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.MANAGER_JOB_INFORMATION"
                  shaped
                  outlined
                  label="Manager"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.DESIGNATION_JOB_INFORMATION"
                  shaped
                  outlined
                  label="Designation"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="alumni.PHONE_NUMBER_PHONE_INFORMATION"
                  shaped
                  outlined
                  label="Mobile No"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.PERSONAL_EMAIL_ID"
                  d
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu_resignation"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="alumni.DATE_OF_RESIGNATION"
                      label="Resignation Date"
                      prepend-icon="event"
                      readonly
                      shaped
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="alumni.DATE_OF_RESIGNATION"
                    @input="menu_resignation = false"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu_relieving"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="alumni.date_of_relieving"
                      label="Relieving Date"
                      prepend-icon="event"
                      readonly
                      shaped
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="picker"
                    v-model="alumni.date_of_relieving"
                    @input="menu_relieving = false"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.address1"
                  label="Flat No/LandMark"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.CITY_ADDRESSES"
                  label=" City"
                  prepend-icon="mdi-city"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  shaped
                  outlined
                  v-model="alumni.state"
                  label="State"
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
      console.log(parseInt(moment(this.date).format("x")));

      this.$store.commit("adminModule/closeAlumniDialog");
    },
    saveDialog() {
      let alumniData = JSON.parse(JSON.stringify(this.alumni));

      this.$store.commit("adminModule/closeAlumniDialog");
      if (alumniData.GENDER == "Female") {
        alumniData.salutation_personal_information = "Ms";
      } else {
        alumniData.salutation_personal_information = "Mr";
      }
      let data = {
        payload: {
          type: "admin",
          USER_ID: alumniData.USER_ID,

          NATIONALITY_PERSONAL_INFORMATION: "IND",
          salutation_personal_information:
            alumniData.salutation_personal_information,
          CITY_ADDRESSES: alumniData.CITY_ADDRESSES,
          address: alumniData.address1,
          state: alumniData.state,
          PHONE_NUMBER_PHONE_INFORMATION:
            alumniData.PHONE_NUMBER_PHONE_INFORMATION,
          MANAGER_JOB_INFORMATION: alumniData.MANAGER_JOB_INFORMATION,
          DESIGNATION_JOB_INFORMATION: alumniData.DESIGNATION_JOB_INFORMATION,
          FIRST_NAME_PERSONAL_INFORMATION:
            alumniData.FIRST_NAME_PERSONAL_INFORMATION,
          LAST_NAME_PERSONAL_INFORMATION:
            alumniData.LAST_NAME_PERSONAL_INFORMATION,
          DATE_OF_RESIGNATION: parseInt(
            moment(alumniData.DATE_OF_RESIGNATION).format("x")
          ),
          PERSONAL_EMAIL_ID: alumniData.PERSONAL_EMAIL_ID,
          date_of_relieving: parseInt(
            moment(alumniData.date_of_relieving).format("x")
          ),
          DATE_OF_BIRTH: parseInt(moment(alumniData.DATE_OF_BIRTH).format("x")),
          GENDER: alumniData.GENDER,
        },
      };
      console.log(data.payload.DATE_OF_BIRTH);
      console.log(this.date);
      let data1 = {
        USER_ID: alumniData.USER_ID,
        FIRST_NAME_PERSONAL_INFORMATION:
          alumniData.FIRST_NAME_PERSONAL_INFORMATION,
        LAST_NAME_PERSONAL_INFORMATION:
          alumniData.LAST_NAME_PERSONAL_INFORMATION,
      };
      console.log(data);
      if (this.alumni.openFrom == "New") {
        this.$store.dispatch("adminModule/addAlumni", data).then((response) => {
          if (response.data.status == 200) {
            this.$store.commit(
              "adminModule/addNewAlumniToList",
              JSON.parse(JSON.stringify(data))
            );
            this.$store.dispatch("adminModule/getAllAlumni", { payload: {} });
            this.$store.commit("showSnackbar", {
              message: "Alumni Added successfully",
              color: "success",
              heading: "Success",
              duration: 3000,
            });
          } else if (response.data.result == "User Id already exists") {
            this.$store.commit("showSnackbar", {
              message: "Alumni Already Exist",
              color: "Warning",
              heading: "Warning",
              duration: 3000,
            });
          }
        });
      } else {
        this.$store.dispatch("userModule/updateData", data).then((response) => {
          if (response.data.status == 200) {
            // this.$store.commit(
            //   "adminModule/addNewAlumniToList",
            //   JSON.parse(JSON.stringify(data))
            // );
            this.$store.dispatch("adminModule/getAllAlumni", { payload: {} });
            this.$store.commit("showSnackbar", {
              message: "Alumni updated successfully",
              color: "success",
              heading: "Success",
              duration: 3000,
            });
          }
        });
      }
    },
  },
  computed: {
    alumni: {
      get() {
        return this.$store.getters["adminModule/getAlumniDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAlumniDialogData", data);
      },
    },
    showAlumni: {
      get() {
        return this.$store.getters["adminModule/getshowAlumniDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAlumniDialog", data);
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