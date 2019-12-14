<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title class="ml-5">Contact Us</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-form ref="contact" lazy-validation>
            <v-row>
              <!-- <v-col cols="12">
                <v-text-field
                  v-if="Showemail"
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  label="Email*"
                ></v-text-field>
              </v-col>-->
              <v-col cols="12">
                <v-text-field
                  v-model="ask.subject"
                  maxlength="50"
                  :rules="subjectRules"
                  outlined
                  shaped
                  prepend-icon="mdi-message"
                  label="Subject*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="ask.body"
                  maxlength="200"
                  outlined
                  shaped
                  prepend-icon="mdi-comment-text"
                  label="Body"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="sendDialog">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      ask: { subject: "", body: "" },
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      subjectRules: [v => !!v || "Subject is required"]
    };
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    Showemail: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    userId() {
      return this.$store.getters["userModule/getUserData"]._id;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeAskHrDialog");
    },
    sendDialog() {
      this.$emit("closeAskHrDialog");
      // let data = {
      //   payload: {
      //     participants: this.userId,
      //     created_at: moment().unix(),
      //     created_by: this.userId,
      //     updated_by: this.userId,
      //     title: this.ask.subject,
      //     message: this.ask.body,
      //     esclation: false,
      //     esclation_manager_1: ["5de77f4bf7fa0010ac57462d"],
      //     esclation_manager_2: "5de77f4bf7fa0010ac57462d",
      //     esclation_manager_3: "5de77f4bf7fa0010ac57462d",
      //     resolved_status: false
      //   }
      // };
      // this.$store.dispatch("userModule/createTicket", data).then(response => {
      //   if (response.data.status == 200) {
      //     this.$store.commit("showSnackbar", {
      //       message: "We will come back to you shortly",
      //       color: "success",
      //       heading: "Success",
      //       duration: 3000
      //     });
      //   }
      // });

      // this.$store.dispatch("userModule/contactHr", data).then(response => {
      //   if (response.data.status == 200) {
      //     this.$store.commit("showSnackbar", {
      //       message: "We will come back to you shortly",
      //       color: "success",
      //       heading: "Success",
      //       duration: 3000
      //     });
      //   }
      // });
    }
  }
};
</script>