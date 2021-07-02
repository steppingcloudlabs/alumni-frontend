<template>
  <v-layout row wrap >
    <v-dialog v-model="showContact" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Update Contact</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-form ref="contact" lazy-validation>
              <v-row>
                <v-col class="ma-0 pa-1" cols="12" md="6">
                  <v-text-field
                    outlined
                    shaped
                    :rules="phoneRules"
                    v-model="contact.phone"
                    label="Phone Number"
                    prepend-icon="mdi-cellphone"
                  ></v-text-field>
                </v-col>
                <v-col class="ma-0 pa-1" cols="12" md="6">
                  <v-text-field
                    outlined
                    shaped
                    v-model="contact.email"
                    label="Email"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col class="ma-0 pa-0" cols="12">
                  <v-text-field
                    outlined
                    shaped
                    v-model="contact.address"
                    label="Flat No/Landmark"
                    prepend-icon="mdi-home"
                  ></v-text-field>
                </v-col>
                <v-col class="ma-0 pa-1" cols="12" md="6">
                  <v-text-field
                    outlined
                    shaped
                    v-model="contact.city"
                    label=" City"
                    prepend-icon="mdi-city"
                  ></v-text-field>
                </v-col>
                <v-col class="ma-0 pa-1" cols="12" md="6">
                  <v-text-field
                    outlined
                    shaped
                    v-model="contact.state"
                    label="State"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      emailRules: [(v) => /.+@.+/.test(v) || "E-mail must be valid"],
      phoneRules: [v =>/.[0-9]{9}$/.test(v) || "Please Enter valid Phone number",],
      employeeRules: [(v) => !!v || "Employee Id is required"],
      user: {
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
      },
    };
  },
  computed: {
    contact: {
      get() {
        return this.$store.getters["userModule/getContactDialogData"];
      },
      set(data) {
        this.$store.commit("userModule/setShowContactDialogData", {
          phone: this.userData.PHONE_NUMBER_PHONE_INFORMATION,
          email: this.userData.PERSONAL_EMAIL_ID,
          city: this.userData.CITY_ADDRESSES,
          address: this.userData.address,
          state: this.userData.state,
        });
      },
    },
    showContact: {
      get() {
        return this.$store.getters["userModule/getshowContactDialog"];
      },
      set(data) {
        this.$store.commit("userModule/setShowContactDialog", data);
      },
    },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("userModule/closeContactDialog");
    },
    saveDialog() {
       let success
      let error
      let warning
      if(this.$vuetify.theme.dark)
      {
        success=this.$vuetify.theme.themes.dark.success
        error=this.$vuetify.theme.themes.dark.error;
        warning=this.$vuetify.theme.themes.dark.warning
      }
      else
      {
        success=this.$vuetify.theme.themes.light.success
        error=this.$vuetify.theme.themes.light.error;
        warning=this.$vuetify.theme.themes.light.warning
      }
      if (this.$refs.contact.validate()) {
        let contactData = JSON.parse(JSON.stringify(this.contact));
        this.$store.commit("userModule/closeContactDialog");
        let data = {
          payload: {
            USERID: this.userData.USER_ID,
            CITY_ADDRESSES: contactData.city,
            PHONE_NUMBER_PHONE_INFORMATION: contactData.phone,
            PERSONAL_EMAIL_ID: contactData.email,
            address: contactData.address,
            state: contactData.state,
          },
        };
        let updatedData = {
          USER_ID: this.userData.USER_ID,
          CITY_ADDRESSES: contactData.city,
          PHONE_NUMBER_PHONE_INFORMATION: contactData.phone,
          PERSONAL_EMAIL_ID: contactData.email,
          address: contactData.address,
          state: contactData.state,
        };
        console.log(data);
        this.$store.dispatch("userModule/updateData", data).then((response) => {
          if (response.data.status == 200) {
            this.$store.commit("userModule/setUpdateContactData", updatedData);
            this.$store.commit("showSnackbar", {
              message: "Contact Updated successfully",
              color: success,
              heading: "Success",
              duration: 3000,
            });
          }
        });
      } else {
        this.$store.commit("showSnackbar", {
          color: error,
          duration: 1000,
          message: "Correct Errors",
          heading: "Error",
        });
      }
    },
  },
};
</script>