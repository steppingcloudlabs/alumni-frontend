<template>
  <v-layout row wrap >
    <v-flex xs12>
      <v-dialog v-model="showNews" persistent max-width="600px">
        <v-card>
          <v-toolbar class="mb-5">
            <v-toolbar-title class="ml-5">Add News</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col cols="4">
                    <img
                      v-if="news.PHOTO"
                      class="img"
                      :src="news.PHOTO"
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
                      shaped
                      outlined
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      label="Upload Image"
                      @change="getBase64Image"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      shaped
                      outlined
                      v-model="news.TITLE"
                      label="Headline*"
                      :rules="titleRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      shaped
                      outlined
                      v-model="news.CONTENT"
                      label="Body*"
                      required
                      :rules="bodyRules"
                       maxlength="5000"
                    ></v-textarea>
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
                        :max="new Date().toISOString().substr(0, 10)"
                      ></v-date-picker>
                    </v-menu>
                     <small>*indicates required field</small>
                  </v-col>

                  <!-- <v-col cols="12">
                     
                     </v-col> -->
                </v-row>

              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions style="margin-top:-20px">
            <div class="flex-grow-1"></div>
            <v-btn color="error darken-1" text @click="closeDialog"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      titleRules: [(v) => !!v || "Title is required"],
      bodyRules: [(v) => !!v || "Body is required"],
      imageBase64: "",
      showCalender: false,
      menu2: false,
    };
  },
  mounted() {},
  computed: {
    news: {
      get() {
        return this.$store.getters["adminModule/getNewsDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNewsDialogData", data);
      },
    },
    showNews: {
      get() {
        return this.$store.getters["adminModule/getshowNewsDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNews", data);
      },
    },
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getBase64Image(file) {
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.news.PHOTO = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    closeDialog() {
      let currDate = parseInt(moment(this.Date).format("x"));
      console.log(currDate);
      this.$store.commit("adminModule/closeNewsDialog");
    },
    saveDialog() {
      let newData = JSON.parse(JSON.stringify(this.news));
      this.$store.commit("showProgressBar", {});

      this.$store.commit("adminModule/closeNewsDialog");
      let currDate = parseInt(moment(this.Date).format("x"));
      console.log(currDate);
      let vm = this;
      let data = {
        payload: {
          TITLE: newData.TITLE,
          CONTENT: newData.CONTENT,
          tag: newData.title,
          DATE: currDate.toString(),
          AUTHOR: "admin",
          ID: newData.ID ? newData.ID : undefined,
          PHOTO: newData.PHOTO,
        },
      };
      this.$store.dispatch("adminModule/addNews", data).then((response) => {
        
          this.$store.commit(
            "adminModule/addNewsToList",
            response.data.result
          );
        //  this.$emit("update",data)
          this.$store.commit("showSnackbar", {
            message: "News Added successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
       
          // this.$store.commit("showSnackbar", {
          //   message: "News updated successfully",
          //   color: "success",
          //   heading: "Success",
          //   duration: 3000,
          // });
          // this.$store.dispatch("adminModule/getAllNews", { payload: {} });
        this.$store.commit("closeProgressBar", {});
      }).catch((error) => {
        this.$store.commit("closeProgressBar", {});
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error",
          });
        });
      ;
    },
  },
};
</script>
<style >
.v-dialog
{
  margin-top: 10vh !important;
  
}
.v-dialog__content 
{
z-index: 9999 !important;
}

</style>