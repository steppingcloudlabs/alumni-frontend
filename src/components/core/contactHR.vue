<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title class="ml-5">Contact Us</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text class="mt-3">
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
      subjectRules: [v => !!v || "Subject is required"],
      esclationList: [{}, {}, {}]
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
  watch: {
    dialog() {
      if (this.dialog) {
        this.getAllEscaltionManager();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeAskHrDialog");
    },
    getAllEscaltionManager() {
      this.$store.dispatch("adminModule/getMangerList", {}).then(response => {
        if (response && response.status == 200) {
          for (let i = 0; i < response.data.result.length; i++) {
            let level = response.data.result[i].level.charAt(
              response.data.result[i].level.length - 1
            );
            this.esclationList[parseInt(level) - 1] = response.data.result[i];
          }
          console.log(this.esclationList);
        }
      });
    },
    sendDialog() {
      this.$emit("closeAskHrDialog");
      let data = {
        payload: {
          participants: this.userId,
          created_at: moment().unix(),
          created_by: this.userId,
          updated_by: this.userId,
          title: this.ask.subject,
          message: this.ask.body,
          messagebody: this.ask.body,
          esclation: false,
          esclation_manager_1: this.esclationList[0].esclation_manager_id._id,
          esclation_manager_2: this.esclationList[1].esclation_manager_id._id,
          esclation_manager_3: this.esclationList[2].esclation_manager_id._id,
          resolved_status: false
        }
      };
      this.$store.dispatch("userModule/createTicket", data).then(response => {
        if (response.data.status == 200) {
          this.$store.commit("showSnackbar", {
            message: "We will come back to you shortly",
            color: "success",
            heading: "Success",
            duration: 3000
          });
          this.$emit("updateQueryList");
        }
      });
    }
  }
};
</script>