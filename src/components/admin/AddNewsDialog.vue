<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="showNews" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add News</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      v-model="news.title"
                      label="Headline*"
                      :rules="titleRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="news.content" label="Body*" required :rules="bodyRules"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="picker" label="Date" required>
                      <v-icon @click="showCalender=true">mdi-calender</v-icon>
                    </v-text-field>
                  </v-col>
                  <v-row justify="center" v-if="showCalender">
                    <v-date-picker v-model="picker"></v-date-picker>
                  </v-row>
                  <v-col cols="12">
                    <v-file-input
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      label="Upload Image"
                      @change="getBase64Image"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
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
      titleRules: [v => !!v || "Title is required"],
      bodyRules: [v => !!v || "Body is required"],
      imageBase64: "",
      showCalender: false,
      picker: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    news: {
      get() {
        return this.$store.getters["adminModule/getNewsDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNewsDialogData", data);
      }
    },
    showNews: {
      get() {
        return this.$store.getters["adminModule/getshowNewsDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNews", data);
      }
    }
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
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
      this.$store.commit("adminModule/closeNewsDialog");
    },
    saveDialog() {
      let newData = JSON.parse(JSON.stringify(this.news));
      this.$store.commit("adminModule/showNewsProgress", {});

      this.$store.commit("adminModule/closeNewsDialog");
      let currDate = parseInt(moment().format("x"));
      console.log(currDate);
      let data = {
        title: newData.title,
        content: newData.content,
        tag: newData.title,
        date: currDate,
        author: undefined,
        id: newData._id ? newData._id : undefined,
        photo: this.imageBase64
      };
      this.$store.dispatch("adminModule/addNews", data).then(response => {
        if (data.id == null) {
          this.$store.commit("adminModule/addNewsToList", response.data.result);

          this.$store.commit("showSnackbar", {
            message: "News Added successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
        } else {
          //   this.$store.commit(
          //   "adminModule/updateNewsToList",
          //   JSON.parse(JSON.stringify(newData))
          // );
          this.$store.commit("showSnackbar", {
            message: "News updated successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
          this.$store.dispatch("adminModule/getAllNews");
        }

        this.$store.commit("adminModule/closeNewsProgress", {});
      });
    }
  }
};
</script>