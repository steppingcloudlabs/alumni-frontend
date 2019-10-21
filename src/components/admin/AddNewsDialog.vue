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
                    <v-file-input accept="image/*" prepend-icon="mdi-camera" label="Upload Image"></v-file-input>
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
      bodyRules: [v => !!v || "Body is required"]
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
    closeDialog() {
      this.$store.commit("adminModule/closeNewsDialog");
    },
    saveDialog() {
      let newData = JSON.parse(JSON.stringify(this.news));
      this.$store.commit("adminModule/showNewsProgress", {});

      this.$store.commit("adminModule/closeNewsDialog");
      let currDate = moment().format("L");
      let data = {
        title: newData.title,
        content: newData.content,
        tag: newData.title,
        date: currDate,
        author: null,
        id: newData._id ? newData._id : null
      };
      this.$store.dispatch("adminModule/addNews", data).then(response => {
        if(data.id==null)
        {
          this.$store.commit(
          "adminModule/addNewsToList",
          JSON.parse(JSON.stringify(newData))
        );
        this.$store.commit("showSnackbar", {
          message: "News Added successfully",
          color: "success",
          heading: "Success",
          duration: 3000
        }).catch(error => {
          
          this.$store.commit("showNetworkError");
        });
        }
        else
        {
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
        this.$store.dispatch("adminModule/getAllNews")

        }
        
        this.$store.commit("adminModule/closeNewsProgress", {});
      });
    }
  }
};
</script>