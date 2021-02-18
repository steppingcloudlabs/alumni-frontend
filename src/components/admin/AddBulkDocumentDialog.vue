<template>
  <v-layout row wrap >
    <v-dialog v-model="showBulk" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Upload Bulk Document </v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
         
            <v-subheader style="text-align: center">Special Instructions</v-subheader>
            <li
              class="mb-2 ml-5"
              v-for="(item, i) in items"
              :key="i"
              style="text-align: left;font-size:10px"
            >
              <span>{{ item.text }}</span>
            </li>
         
         <v-checkbox
         v-model="checkbox"
      :label="`Please tick if you have uploaded documents in SFTP server`"
    ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!checkbox" color="blue darken-1" text @click="saveDialog">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items:[{text:"Upload the files in SFTP Server"},{text:"File name should be fileType_UserId. For example:firstmonthsalary_1234"}],
      checkbox:"",
     
    
    };
  },
  computed: {
   
    showBulk: {
      get() {
        return this.$store.getters["adminModule/getshowBulkDocument"];
      },
      set(data) {
        this.$store.commit("adminModule/setshowBulkDocument", data);
      },
    },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    },
  },
  methods: {
    getBase64(file) {
      //console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.avatar.profile = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    closeDialog() {
      this.$store.commit("adminModule/setshowBulkDocument",false);
    },
    saveDialog() {
      this.$store.commit("showProgressBar", {});
       this.$store.commit("adminModule/setshowBulkDocument",false);
      let data=""
      this.$store.dispatch("adminModule/bulkUploadADocumentCount", data).then((response) => {
        if (response.status == 200) {
           this.$store.commit("closeProgressBar", {});
          this.$store.commit("showSnackbar", {
            message: response.result,
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          this.$store.dispatch("adminModule/bulkUploadTrigger",data).then((response)=>
          {
              if (response.status == 200) 
              {
         
             this.$store.commit("showSnackbar", {
                     message: "Upload Succesfully",
                     color: "success",
                    heading: "Success",
                    duration: 3000,
                     })
              }
          })
        } else {
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: "Correct Errors",
            heading: "Error",
          });
        }
      });
    },
  },
};
</script>