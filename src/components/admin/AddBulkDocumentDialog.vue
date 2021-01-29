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
         
          <v-file-input
            :rules="rules"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
           
            prepend-icon="mdi-attachment"
            label="Upload Csv"
            @change="getBase64"
          ></v-file-input>
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
    
      employeeRules: [(v) => !!v || "Employee Id is required"],
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
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
      let avatarData = JSON.parse(JSON.stringify(this.avatar));
      this.avatar.profile = "";
     this.$store.commit("adminModule/setshowBulkDocument",false);
      let data = {
        payload: {
          USERID: this.userData.USER_ID,
          PROFILEIMAGE: avatarData.profile,
        },
      };

      console.log(data);
      this.$store.dispatch("userModule/updateData", data).then((response) => {
        if (response.data.status == 200) {
          this.$store.commit("userModule/setUpdateAvatarData", data);
          this.$store.commit("showSnackbar", {
            message: "Avatar Updated successfully",
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
    },
  },
};
</script>