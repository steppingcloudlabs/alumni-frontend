<template>
  <div id="core-login"  class="login" >
    <v-layout row wrap>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" style="margin-top:8%">
          <v-card class="elevation-12" style="background: rgb(0, 0, 0, .5); ">
            <v-toolbar flat outlined="white" style="background: rgb(0, 0, 0, .5)">
              <v-toolbar-title class="text-center" style="color:white">Change Password</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-form ref="passwordChange" v-model="valid" lazy-validation>
                <v-text-field
                  id=" old password"
                  label="Old Password"
                  name=" oldpassword"
                  prepend-icon="lock"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  @click:append="show2 = !show2"
                  v-model="oldpassword"
                  dark
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="New Password"
                  name="password"
                  prepend-icon="lock"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  @click:append="show1 = !show1"
                  v-model="password"
                  :rules="passwordRules"
                  dark
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  name="cnfpassword"
                  prepend-icon="person"
                  type="password"
                  v-model="cnfpassword"
                  dark
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <p class="text-center">
                <v-btn
                  outlined
                  v-on:
                  style="background: rgb(0, 0, 0, 0);color:white"
                  class="mr-2"
                  @click="savePassword"
                >Change password</v-btn>
                <v-btn
                  outlined
                  v-on:
                  style="background: rgb(0, 0, 0, 0);color:white"
                  @click="$router.go(-1)"
                >Cancel</v-btn>
              </p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";
import { constants } from "crypto";

export default {
  data() {
    return {
      show2: false,
      show1: false,
      valid: true,
      cnfpassword: null,
      password: null,
      oldpassword: null,

      passwordRules: [
        v => !!v || "Password is required",
        v =>
          /.(?=.*[A-Z]*)/.test(v) ||
          "Password must contain one uppercase letter",
        v =>
          /.(?=.*[a-z]*)/.test(v) ||
          "Password must contain one Lowercase letter",
        v => /.(?=.*\d*)/.test(v) || "Password must contain one Number letter",

        v => v.length > 6 || "Password must be greater than 6 characters"
      ]
    };
  },

  computed: {
    test: {
      get() {
        return this.$store.getters["userModule/getTest"];
      },
      set(data) {
        this.$store.commit("userModule/setTest", data);
      }
    },
     userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"]
            .PERSONAL_EMAIL_ID
        : null;
    },

  },
  methods: {
    savePassword() {
      if (this.$refs.passwordChange.validate()) {
        this.$store.commit("showProgressBar", {});
        this.$store.dispatch("userModule/changePassword",{payload:{NEWPASSWORD:this.password,OLDPASSWORD:this.oldpassword,EMAIL:this.userData}}).then(response=>{
          if(response.status==200)
          {
            this.$store.commit("closeProgressBar",{})
              this.$store.commit("showSnackbar", {
          color: "green",
          duration: 1000,
          message: "Password Updated Sucessfully",
          heading: "Success"
        });
          }
          else
          {
             this.$store.commit("closeProgressBar",{})
              this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: response.result,
          heading: "Error"
        });
          }
        })
      }
    }
  }
};
</script>
<style  >
a {
  text-decoration: none;
  color: #66fcf1;
}
/* 
.back {
  background-color: transparent;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
} */
</style>
