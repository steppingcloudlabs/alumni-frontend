<template>
  <v-layout row wrap>
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
                    v-model="contact.phone"
                    label="Phone No"
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
                  <v-text-field outlined shaped v-model="contact.state" label="State"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
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
export default {
  data() {
    return {
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
      // phoneRules: [
      //   v =>
      //     (v.length > 9 && v.length < 11) || "Please Enter valid Phone number"
      // ],
      employeeRules: [v => !!v || "Employee Id is required"],
      user: {
        phone: "",
        email: "",
        address: "",
        city: "",
        state: ""
      }
    };
  },
  computed: {
    contact: {
      get() {
        return this.$store.getters["userModule/getContactDialogData"];
      },
      set(data) {
        this.$store.commit("userModule/setShowContactDialogData", {
          phone: this.userData.phone_number_phone_information,
          email: this.userData.personal_email_id,
          city: this.userData.city_addresses,
          address: this.userData.address,
          state: this.userData.state
        });
      }
    },
    showContact: {
      get() {
        return this.$store.getters["userModule/getshowContactDialog"];
      },
      set(data) {
        this.$store.commit("userModule/setShowContactDialog", data);
      }
    },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("userModule/closeContactDialog");
    },
    saveDialog() {
      if (this.$refs.contact.validate()) {
        let contactData = JSON.parse(JSON.stringify(this.contact));
        this.$store.commit("userModule/closeContactDialog");
        let data = {
          payload: {
            user_id: this.userData.user_id,
            city_addresses: contactData.city,
            phone_number_phone_information: contactData.phone,
            personal_email_id: contactData.email,
            address: contactData.address,
            state: contactData.state
          }
        };
        let updatedData = {
          user_id: this.userData.user_id,
          city_addresses: contactData.city,
          phone_number_phone_information: contactData.phone,
          personal_email_id: contactData.email,
          address: contactData.address,
          state: contactData.state
        };
        console.log(data);
        this.$store.dispatch("userModule/updateData", data).then(response => {
          if (response.data.status == 200) {
            this.$store.commit("userModule/setUpdateContactData", updatedData);
            this.$store.commit("showSnackbar", {
              message: "COntact Updated successfully",
              color: "success",
              heading: "Success",
              duration: 3000
            });
          }
        });
      } else {
        this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: "Correct Errors",
          heading: "Error"
        });
      }
    }
  }
};
</script>