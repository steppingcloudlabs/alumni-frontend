<template>
  <v-layout row wrap >
    <v-dialog v-model="showAvatar" width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Update Avatar</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <p class="text-center">
            <img
              v-if="avatar.profile"
              class="img"
              :src="avatar.profile"
              style="border-radius: 50%; border: 3px solid white;  width: 200px;
                    max-height:150px;"
            />
            <img
              v-else
              class="img"
              src="@/assets/avatar/download.jpg"
              style="border-radius: 50%; border: 3px solid white;  width: 200px;
                    max-height:150px;"
            />
          </p>
          <!-- <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
           
            prepend-icon="mdi-camera"
            label="Pick an avatar"
            @change="getBase64"
          ></v-file-input> -->
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
      profileimage: "",
      emailRules: [(v) => /.+@.+/.test(v) || "E-mail must be valid"],
      // phoneRules: [
      //   v =>
      //     (v.length > 9 && v.length < 11) || "Please Enter valid Phone number"
      // ],
      employeeRules: [(v) => !!v || "Employee Id is required"],
      rules: [
        (value) =>
          !value ||
          value.size < 100000 ||
          "Avatar size should be less than 100KB!",
      ],
    };
  },
  computed: {
    avatar: {
      get() {
        return this.$store.getters["userModule/getAvatarDialogData"];
      },
      set(data) {
        this.$store.commit("userModule/setShowAvatarDialogData", {
          profile: this.userData.PROFILEIMAGE,
          userid: this.userData.USER_ID,
        });
      },
    },
    showAvatar: {
      get() {
        return this.$store.getters["userModule/getshowAvatarDialog"];
      },
      set(data) {
        this.$store.commit("userModule/setShowAvatarDialog", data);
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
      this.$store.commit("userModule/closeAvatarDialog");
    },
    saveDialog() {
      let avatarData = JSON.parse(JSON.stringify(this.avatar));
      this.avatar.profile = "";
      this.$store.commit("userModule/closeAvatarDialog");
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