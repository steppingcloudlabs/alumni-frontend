<template>
  <v-layout row wrap>
    <v-dialog v-model="showAlumni" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Alumni</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.user_id" label="Employee Id"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.salutation_personal_information" label="Salutation"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.first_name_personal_information" label="First Name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.last_name_personal_information" label="Last Name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.manager_job_information" label="Manager"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.designation_job_information" label="Designation"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.phone_number_phone_information" label="Mobile No"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.date_of_resignation" label="Resignation Date"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="alumni.relieving" label="Relieving Date"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="alumni.city_addresses" label="Address"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialog() {
      console.log(this.dialog);
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("adminModule/closeAlumniDialog");
    },
    saveDialog() {
      let alumniData = JSON.parse(JSON.stringify(this.alumni));
      this.$store.commit("adminModule/closeAlumniDialog");
      let data = {
        user_id: alumniData.user_id,

        nationality_personal_information: "IND",
        salutation_personal_information:
          alumniData.salutation_personal_information,
        city_addresses: alumniData.city_addresses,
        phone_number_phone_information:
          alumniData.phone_number_phone_information,
        manager_job_information: alumniData.manager_job_information,
        designation_job_information: alumniData.designation_job_information,
        first_name_personal_information:
          alumniData.first_name_personal_information,
        last_name_personal_information:
          alumniData.last_name_personal_information,
        date_of_resignation: alumniData.resignation,
        email: alumniData.email,
        data_of_relieving: alumniData.relieving
      };
      let data1 = {
        user_id: alumniData.user_id,
        first_name_personal_information:
          alumniData.first_name_personal_information,
        last_name_personal_information:
          alumniData.last_name_personal_information
      };
      console.log(data);
      this.$store.dispatch("adminModule/addAlumni", data).then(response => {
        if (response.data.status == 200) {
          this.$store.commit(
            "adminModule/addNewAlumniToList",
            JSON.parse(JSON.stringify(data))
          );
          this.$store.dispatch("adminModule/getAllAlumni");
          this.$store.commit("showSnackbar", {
            message: "Alumni Added successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
        } else if (response.data.result == "User Id already exists") {
          this.$store.commit("showSnackbar", {
            message: "Alumni Already Exist",
            color: "Warning",
            heading: "Warning",
            duration: 3000
          });
        }
      });
    }
  },
  computed: {
    alumni: {
      get() {
        return this.$store.getters["adminModule/getAlumniDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAlumniDialogData", data);
      }
    },
    showAlumni: {
      get() {
        return this.$store.getters["adminModule/getshowAlumniDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowAlumni", setShowAlumniDialog);
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: "EmployeeId",
          align: "left",
          sortable: false,
          value: "user_id"
        },
        { text: "FirstName", value: "FirstName" },
        { text: "LastName", value: "LastName" },
        { text: "SalarySlipStatus", value: "SlipStatus" },
        { text: "Form16Status", value: "Form16Status" }
      ]
    };
  }
};
</script>