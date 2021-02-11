<template>
  <v-layout row wrap>
    <v-dialog v-model="showBulk" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Upload Alumni List </v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-subheader style="text-align: center"
            >Special Instructions</v-subheader
          >
          <li
            class="mb-2 ml-5"
            v-for="(item, i) in items"
            :key="i"
            style="text-align: left; font-size: 10px"
          >
            <span>{{ item.text }}</span>
          </li>

          <v-file-input
            ref="file"
            accept=".csv"
            prepend-icon="mdi-attachment"
            label="Upload Csv"
            type="file"
            @change="handleFileUpload"
          ></v-file-input>

          <!-- <div class="container">
            <div class="container">
              <div class="large-12 medium-12 small-12 cell">
                <label
                  >File
                  <input
                    accept=".csv"
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                </label>
                <button v-on:click="submitFile()">Submit</button>
              </div>
            </div>
          </div> -->
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
      file: "",
      items: [
        {
          text:"File should be in csv format with comma delimiter",
        },
        {
          text: "Fields should not contain any comma as character",
        },
        {
          text:
            "You can upload upto 10,000 Alumni in one batch",
        },
      ],

      // phoneRules: [
      //   v =>
      //     (v.length > 9 && v.length < 11) || "Please Enter valid Phone number"
      // ],
    };
  },
  computed: {
    showBulk: {
      get() {
        return this.$store.getters["adminModule/getshowBulkALumni"];
      },
      set(data) {
        this.$store.commit("adminModule/setshowBulkAlumni", data);
      },
    },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    },
  },
  methods: {
    submitFile() {
      /*
                Initialize the form data
        

        */

      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("filename", this.file);

      this.$store
        .dispatch("adminModule/bulkUploadAlumni", formData)
        .then((response) => {
          if (response) {
            console.log(response);
            this.$store.commit("showSnackbar", {
              message: "Upload Completed, Please Check Dashboard for status",
              color: "success",
              heading: "Success",
              duration: 3000,
            });
          } else {
            this.$store.commit("showSnackbar", {
              color: "red",
              duration: 1000,
              message: "Correct Errors",
              heading: "Error",
            });
          }
        });
      console.log(formData.get("filename"));
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload(file) {
      // this.file = this.$refs.file.files[0];
      this.file=file
    },
    closeDialog() {
      this.$store.commit("adminModule/setshowBulkAlumni", false);
    },
    saveDialog() {
                  this.$store.commit("showSnackbar", {
              message: "Upload in progress",
              color: "success",
              heading: "Success",
              duration: 3000,
            });
      this.submitFile();
      this.$store.commit("adminModule/setshowBulkAlumni", false);
      
    },
  },
};
</script>