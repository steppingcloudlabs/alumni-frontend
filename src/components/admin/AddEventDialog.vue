<template>
  <v-layout row wrap>
    <v-dialog v-model="showEvent" persistent max-width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Add Event</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="event.title"
                  label="Title*"
                  required
                  :rules="titleRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="event.content"
                  label="Description*"
                  required
                  :rules="bodyRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field shaped outlined v-model="event.location" label="Location" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="event"
                      readonly
                      shaped
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  label="Upload Image"
                  @change="getBase64Image"
                  shaped
                  outlined
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    event: {
      get() {
        return this.$store.getters["adminModule/getEventDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowEventDialogData", data);
      }
    },
    showEvent: {
      get() {
        return this.$store.getters["adminModule/getshowEventDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowEvent", data);
      }
    }
  },
  data() {
    return {
      titleRules: [v => !!v || "Title is required"],
      bodyRules: [v => !!v || "Body is required"],

      date: new Date().toISOString().substr(0, 10),
      menu2: false
    };
  },
  methods: {
    getBase64Image(file) {
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.imageBase64 = str;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    closeDialog() {
      this.$store.commit("adminModule/closeEventDialog");
    },
    saveDialog() {
      let eventData = JSON.parse(JSON.stringify(this.event));
      this.$store.commit("adminModule/showEventsProgress", {});
      this.$store.commit("adminModule/closeEventDialog");
      let currDate = parseInt(moment(this.Date).format("x"));
      let data = {
        payload: {
          title: eventData.title,
          content: eventData.content,
          tag: eventData.title,
          id: eventData._id ? eventData._id : null,
          photo: this.imageBase64,
          date: currDate
        }
      };
      this.$store.dispatch("adminModule/addEvents", data).then(response => {
        if (data.id == null) {
          this.$store.commit(
            "adminModule/addEventToList",
            JSON.parse(JSON.stringify(response.data.result))
          );
          this.$store.commit("showSnackbar", {
            message: "Event added successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
        } else {
          this.$store.dispatch("adminModule/getAllEvent", { payload: {} });
          this.$store.commit("showSnackbar", {
            message: "Event updated successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
        }
        this.$store.commit("adminModule/closeEventsProgress", {});
      });
    }
  }
};
</script>