<template>
  <v-layout row wrap class="dialogClass">
    <v-dialog v-model="showEvent" persistent max-width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Add Event</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <img
                  v-if="event.PHOTO"
                  class="img"
                  :src="event.PHOTO"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 120px;
                  "
                />
                <img
                  v-else
                  class="img"
                  src="@/assets/news.png"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 120px;
                  "
                />
              </v-col>
              <v-col cols="8" class="mt-5">
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
            <v-row>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="event.TITLE"
                  label="Title*"
                  required
                  :rules="titleRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  shaped
                  outlined
                  v-model="event.CONTENT"
                  label="Description*"
                  required
                  :rules="bodyRules"
                   maxlength="1000"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  shaped
                  outlined
                  v-model="event.LOCATION"
                  label="Location"
                  required
                ></v-text-field>
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
                 <small>*indicates required field</small>
              </v-col>
             
            </v-row>
          </v-container>
         
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
      },
    },
    showEvent: {
      get() {
        return this.$store.getters["adminModule/getshowEventDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowEvent", data);
      },
    },
  },
  data() {
    return {
      titleRules: [(v) => !!v || "Title is required"],
      bodyRules: [(v) => !!v || "Body is required"],
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
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
        this.event.PHOTO = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    closeDialog() {
      this.$store.commit("adminModule/closeEventDialog");
    },
    saveDialog() {
      let eventData = JSON.parse(JSON.stringify(this.event));
      this.$store.commit("showProgressBar", {});
      this.$store.commit("adminModule/closeEventDialog");
      let currDate = parseInt(moment(this.date).format("x"));
      let data = {
        payload: {
          TITLE: eventData.TITLE,
          CONTENT: eventData.CONTENT,
          TAG: eventData.TITLE,
          ID: eventData.ID ? eventData.ID : undefined,
          PHOTO: eventData.PHOTO,
          DATE: currDate.toString(),
        },
      };
      this.$store.dispatch("adminModule/addEvents", data).then((response) => {
        this.$store.commit("adminModule/showEventsProgress", {});
        this.$store.commit(
          "adminModule/addEventToList",
          JSON.parse(JSON.stringify(response.data.result[0]))
        );
        this.$store.commit("showSnackbar", {
          message: "Event added successfully",
          color: "success",
          heading: "Success",
          duration: 3000,
        });
        // } else {
        //   this.$store.dispatch("adminModule/getAllEvent", { payload: {} });
        //   this.$store.commit("showSnackbar", {
        //     message: "Event updated successfully",
        //     color: "success",
        //     heading: "Success",
        //     duration: 3000,
        //   });
        // }
        this.$store.commit("closeProgressBar", {});
      });
    },
  },
};
</script>